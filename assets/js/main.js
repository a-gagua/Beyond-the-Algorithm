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
  // Header height.
  //
  // Publishes the bar's real height as --header-h so the hero can be
  // exactly one viewport tall from the top of the window.
  //
  // This used to also swap the bar between two appearances as the hero
  // scrolled past. The bar now keeps one appearance throughout, so the
  // scroll listener and the .is-stuck class are gone — all that is left
  // is the measurement.
  // ---------------------------------------------------------------

  var header = document.querySelector(".site-header");

  if (header) {
    var measure = function () {
      document.documentElement.style.setProperty(
        "--header-h", header.offsetHeight + "px"
      );
    };
    measure();
    window.addEventListener("resize", measure);
  }

  // ---------------------------------------------------------------
  // Hero scroll progress.
  //
  // Publishes --hero-p and --reveal-badges on .hero as
  // the pinned stage is scrolled through; the CSS in style.css reads
  // them and falls back to the finished state if this never runs.
  // No-op on the three pages with no hero, and under reduced motion,
  // where the stage is not pinned at all.
  // ---------------------------------------------------------------

  var hero = document.querySelector(".hero");
  var stage = hero && hero.querySelector(".hero__stage");
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (hero && stage && !still) {
    var clamp01 = function (n) { return n < 0 ? 0 : n > 1 ? 1 : n; };
    // Smoothstep: the beats ease in and out of each other rather than
    // tracking the scrollbar linearly, which reads as mechanical.
    var ease = function (t) { return t * t * (3 - 2 * t); };
    var sub = function (p, a, b) { return clamp01((p - a) / (b - a)); };

    var revealFrame = null;
    var track = function () {
      // Scroll room is whatever the stage does not fill. Measured, not
      // assumed, so the 200svh/155svh breakpoint needs no mirror here.
      var room = hero.offsetHeight - stage.offsetHeight;
      var p = room > 0 ? clamp01(-hero.getBoundingClientRect().top / room) : 0;

      hero.style.setProperty("--hero-p", p.toFixed(4));

      // --field-in is the main event: the two coloured fields closing on
      // the disc. The badges follow it in.
      //
      // --reveal-cta is gone. It faded the two buttons in from opacity 0
      // between 12% and 40% of the hero's scroll, which meant the only
      // two actions on the opening screen did not exist until you had
      // already started scrolling past them. They are now always visible
      // and nothing here needs to drive them.
      hero.style.setProperty("--field-in", ease(sub(p, 0.00, 0.45)).toFixed(4));
      hero.style.setProperty("--reveal-badges", ease(sub(p, 0.10, 0.42)).toFixed(4));
    };

    window.addEventListener("scroll", function () {
      if (revealFrame) return;
      revealFrame = requestAnimationFrame(function () { revealFrame = null; track(); });
    }, { passive: true });
    window.addEventListener("resize", track);
    track();
  }

  // ---------------------------------------------------------------
  // Pointer parallax on the lid.
  //
  // The gear, the sparkles and the disc drift with the pointer, each
  // by a different amount — the CSS holds the distances. Published as
  // --mx / --my, a pair of offsets from the centre of the stage in the
  // range -0.5 to 0.5.
  //
  // Pointer devices only. On touch there is no hover to track, and
  // under reduced motion the properties are never set, so the fallback
  // of 0 in the CSS leaves everything exactly where it was.
  // ---------------------------------------------------------------

  if (hero && stage && !still && window.matchMedia("(hover: hover)").matches) {
    var wantX = 0;
    var wantY = 0;
    var atX = 0;
    var atY = 0;
    var driftFrame = null;

    var glide = function () {
      driftFrame = null;

      // Ease toward the pointer rather than tracking it one-for-one,
      // which is the difference between drifting and twitching.
      atX += (wantX - atX) * 0.08;
      atY += (wantY - atY) * 0.08;

      hero.style.setProperty("--mx", atX.toFixed(4));
      hero.style.setProperty("--my", atY.toFixed(4));

      // Keep running until it has actually arrived. Without this the
      // lid stops wherever the last pointer event left it, and leaving
      // the hero never glides back to centre.
      if (Math.abs(wantX - atX) > 0.0005 || Math.abs(wantY - atY) > 0.0005) {
        driftFrame = requestAnimationFrame(glide);
      }
    };

    var nudge = function () {
      if (!driftFrame) driftFrame = requestAnimationFrame(glide);
    };

    stage.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;
      var box = stage.getBoundingClientRect();
      wantX = (e.clientX - box.left) / box.width - 0.5;
      wantY = (e.clientY - box.top) / box.height - 0.5;
      nudge();
    });

    stage.addEventListener("pointerleave", function () {
      wantX = 0;
      wantY = 0;
      nudge();
    });
  }

  // ---- Run track -------------------------------------------------
  // Clicking a stop emphasises it and dims the other three. Nothing is
  // revealed or hidden: all four paragraphs are in the markup and stay
  // readable, so a visitor who never clicks — or who has JS off — sees
  // the whole section at equal weight, which is the default state.
  //
  // .is-selecting only goes on after the first click. Without it the
  // page would load with three quarters of the section greyed out,
  // which reads as a rendering fault rather than as a choice.
  //
  // Clicking the selected stop again clears the selection, so there is
  // always a way back to the default view without reloading.
  var run = document.querySelector("[data-run]");

  if (run) {
    var stops = Array.prototype.slice.call(run.querySelectorAll(".run__stop"));

    var select = function (stop) {
      var clearing = stop === null || stop.classList.contains("is-current");

      stops.forEach(function (s) {
        var on = !clearing && s === stop;
        s.classList.toggle("is-current", on);
        var trigger = s.querySelector(".run__trigger");
        if (trigger) trigger.setAttribute("aria-pressed", String(on));
      });

      run.classList.toggle("is-selecting", !clearing);
    };

    run.addEventListener("click", function (e) {
      var trigger = e.target.closest(".run__trigger");
      if (!trigger) return;
      select(trigger.closest(".run__stop"));
    });

    // Escape returns to the default view, matching the toggle-off click.
    run.addEventListener("keydown", function (e) {
      if (e.key === "Escape") select(null);
    });
  }

  // The contact form has no endpoint yet. A form with no action posts to
  // its own URL, which on a static host returns the same page and looks
  // exactly like success — so someone types out a real message, sees the
  // page reload, and assumes it was sent. Nothing would have been.
  //
  // Until Formspree or Web3Forms is wired up (see the comment in
  // contact.html), block the submit and hand over a mailto that carries
  // what they already typed, so the effort is not wasted. Deleting the
  // data-endpoint-pending attribute turns all of this off.
  var pending = document.querySelector("form[data-endpoint-pending]");

  if (pending) {
    pending.addEventListener("submit", function (e) {
      e.preventDefault();

      var notice = pending.querySelector("[data-form-notice]");
      if (!notice) return;

      var field = function (name) {
        var el = pending.elements[name];
        return el && el.value ? el.value : "";
      };

      var href =
        "mailto:agagua@tudelft.nl" +
        "?subject=" + encodeURIComponent("Beyond the Algorithm — enquiry") +
        "&body=" + encodeURIComponent(
          field("message") + "\n\n— " + field("name") + " (" + field("email") + ")"
        );

      notice.innerHTML = "";

      notice.appendChild(document.createTextNode(
        "This form isn't connected to an inbox yet. "
      ));

      var link = document.createElement("a");
      link.href = href;
      link.textContent = "Send it as an email instead";
      notice.appendChild(link);

      notice.appendChild(document.createTextNode(
        " — your message is already in it."
      ));

      link.focus();
    });
  }

})();
