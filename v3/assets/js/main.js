/* Mobile nav toggle + current-page marking.
   Kept deliberately small: no build step, no dependencies. */

(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Close the menu when a link is followed on the same page (anchors)
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Mark the current page in the nav. Works on GitHub Pages under a
  // project subpath because we compare filenames, not full paths.
  var here = window.location.pathname.split("/").pop() || "index.html";

  Array.prototype.forEach.call(nav ? nav.querySelectorAll("a") : [], function (a) {
    var href = a.getAttribute("href");

    // "About the game" points at a section of the landing page, not a page
    // of its own. Marking it would put aria-current on two nav items at
    // once on the home page, which is worse than marking neither.
    if (href.indexOf("#") !== -1) return;

    var target = href.split("/").pop() || "index.html";
    if (target === here) {
      a.setAttribute("aria-current", "page");
    }
  });

  // ---------------------------------------------------------------
  // Landing-page deck: the cards drift with the pointer.
  //
  // The effect is small on purpose — a few pixels of parallax, more on
  // the cards nearer the front. It is enough to make the stack read as
  // objects sitting on a table rather than a flat illustration.
  //
  // Skipped entirely on touch, on narrow screens where the cards are a
  // flowed list, and whenever reduced motion is requested.
  // ---------------------------------------------------------------

  var deck = document.querySelector(".deck");
  var wants = window.matchMedia;

  if (
    deck &&
    wants &&
    wants("(min-width: 700px)").matches &&
    wants("(hover: hover)").matches &&
    !wants("(prefers-reduced-motion: reduce)").matches
  ) {
    var cards = deck.querySelectorAll(".deck__card");
    var frame = null;

    var drift = function (x, y) {
      Array.prototype.forEach.call(cards, function (card, i) {
        // Front cards travel further, which is what reads as depth.
        var depth = (i + 1) * 7;
        card.style.setProperty("--dx", (x * depth).toFixed(2) + "px");
        card.style.setProperty("--dy", (y * depth * 0.6).toFixed(2) + "px");
      });
    };

    deck.addEventListener("pointermove", function (e) {
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = null;
        var box = deck.getBoundingClientRect();
        drift(
          (e.clientX - box.left) / box.width - 0.5,
          (e.clientY - box.top) / box.height - 0.5
        );
      });
    });

    deck.addEventListener("pointerenter", function () {
      deck.classList.add("is-live");
    });

    deck.addEventListener("pointerleave", function () {
      deck.classList.remove("is-live");
      drift(0, 0);
    });
  }

  // ---------------------------------------------------------------
  // The session track.
  //
  // Four stops that swap one panel underneath them. Progressive
  // enhancement: the markup ships with every panel visible, and the
  // .is-live class below is what hides all but the current one. If
  // this script fails to load the section is still a readable list.
  // ---------------------------------------------------------------

  var runner = document.querySelector(".runner");

  if (runner) {
    var triggers = Array.prototype.slice.call(runner.querySelectorAll(".run__trigger"));
    var panels = Array.prototype.slice.call(runner.querySelectorAll(".runner__panel"));

    runner.classList.add("is-live");

    // Only the selected tab is in the tab order; the arrow keys move
    // between the rest. That is the expected behaviour for a tablist.
    var show = function (i, focus) {
      triggers.forEach(function (t, n) {
        var on = n === i;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        panels[n].classList.toggle("is-current", on);
      });
      if (focus) triggers[i].focus();
    };

    triggers.forEach(function (t, i) {
      t.tabIndex = i === 0 ? 0 : -1;
      t.addEventListener("click", function () { show(i, false); });
      t.addEventListener("keydown", function (e) {
        var to = e.key === "ArrowRight" || e.key === "ArrowDown" ? i + 1
               : e.key === "ArrowLeft" || e.key === "ArrowUp" ? i - 1
               : e.key === "Home" ? 0
               : e.key === "End" ? triggers.length - 1
               : null;
        if (to === null) return;
        e.preventDefault();
        show((to + triggers.length) % triggers.length, true);
      });
    });
  }

  // ---------------------------------------------------------------
  // Gallery.
  //
  // The strip is a scroll-snap row, so it is already swipeable and
  // scrollable with no script at all. All this adds is the arrows,
  // the dots and the caption, and it reads position back off the
  // scroll rather than holding its own index — so dragging, swiping
  // and clicking a dot can never disagree about which slide is up.
  // ---------------------------------------------------------------

  Array.prototype.forEach.call(document.querySelectorAll("[data-gallery]"), function (gal) {
    var track = gal.querySelector(".gallery__track");
    var slides = Array.prototype.slice.call(gal.querySelectorAll(".gallery__slide"));
    if (!track || slides.length < 2) return;

    var arrow = function (d) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M' +
        (d < 0 ? "15 5 8 12l7 7" : "9 5 16 12l-7 7") + '"/></svg>';
    };

    var bar = document.createElement("div");
    bar.className = "gallery__bar";
    bar.innerHTML =
      '<p class="gallery__caption" role="status" aria-live="polite"></p>' +
      '<div class="gallery__nav">' +
        '<div class="gallery__dots"></div>' +
        '<button class="gallery__btn" type="button" data-step="-1" aria-label="Previous photograph">' + arrow(-1) + "</button>" +
        '<button class="gallery__btn" type="button" data-step="1" aria-label="Next photograph">' + arrow(1) + "</button>" +
      "</div>";
    gal.appendChild(bar);

    var caption = bar.querySelector(".gallery__caption");
    var dotWrap = bar.querySelector(".gallery__dots");
    var prev = bar.querySelector('[data-step="-1"]');
    var next = bar.querySelector('[data-step="1"]');

    var dots = slides.map(function (s, i) {
      var d = document.createElement("button");
      d.type = "button";
      d.className = "gallery__dot";
      d.setAttribute("aria-label", "Photograph " + (i + 1) + " of " + slides.length);
      d.addEventListener("click", function () { go(i); });
      dotWrap.appendChild(d);
      return d;
    });

    var go = function (i) {
      track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft });
    };

    // Nearest slide to the current scroll position wins.
    var current = function () {
      var x = track.scrollLeft;
      var best = 0;
      var gap = Infinity;
      slides.forEach(function (s, i) {
        var d = Math.abs(s.offsetLeft - slides[0].offsetLeft - x);
        if (d < gap) { gap = d; best = i; }
      });
      return best;
    };

    var sync = function (forced) {
      var i = typeof forced === "number" ? forced : current();
      dots.forEach(function (d, n) { d.setAttribute("aria-current", String(n === i)); });
      caption.textContent = slides[i].querySelector("img").getAttribute("data-caption") || "";
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
    };

    // Stepping has to work off a remembered index, not off the live
    // scroll position: a second click landing mid-animation would read
    // the slide it is still travelling away from and go nowhere.
    var index = 0;

    var step = function (d) {
      index = Math.min(slides.length - 1, Math.max(0, index + d));
      go(index);
      sync(index);
    };

    prev.addEventListener("click", function () { step(-1); });
    next.addEventListener("click", function () { step(1); });

    var tick = null;
    var settle = null;
    track.addEventListener("scroll", function () {
      if (!tick) {
        tick = requestAnimationFrame(function () { tick = null; sync(); });
      }
      // Once the scroll stops, trust the position again — that is what
      // picks up a swipe or a drag the buttons never knew about.
      clearTimeout(settle);
      settle = setTimeout(function () { index = current(); sync(index); }, 120);
    });
    window.addEventListener("resize", sync);
    sync();
  });


  // ---------------------------------------------------------------
  // Header over the hero.
  //
  // Publishes the header's real height as --header-h so the hero can
  // be exactly one viewport tall from the top of the window, and
  // swaps the bar from transparent to solid once the hero is behind
  // us. Pages with no hero get the solid bar immediately.
  // ---------------------------------------------------------------

  var header = document.querySelector(".site-header");
  var heroEl = document.querySelector(".hero");

  if (header) {
    var measure = function () {
      document.documentElement.style.setProperty(
        "--header-h", header.offsetHeight + "px"
      );
    };
    measure();
    window.addEventListener("resize", measure);

    if (!heroEl) {
      header.classList.add("is-stuck");
    } else {
      var stickFrame = null;
      var restick = function () {
        // Flip just before the hero's bottom edge reaches the bar, so
        // the fill is already there when content arrives under it. The
        // margin has to clear #about's scroll-margin-top, or a nav jump
        // to #about lands exactly in the gap and leaves the bar
        // transparent over the last strip of artwork.
        var past = window.scrollY > heroEl.offsetHeight - header.offsetHeight - 24;
        header.classList.toggle("is-stuck", past);
      };
      window.addEventListener("scroll", function () {
        if (stickFrame) return;
        stickFrame = requestAnimationFrame(function () {
          stickFrame = null;
          restick();
        });
      }, { passive: true });
      window.addEventListener("resize", restick);
      restick();
    }
  }

})();
