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
})();
