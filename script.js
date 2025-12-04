/* ============================================================
   XREACH GLOBAL SCRIPT — PRODUCTION BUILD v4.0
   (Animations + Google Maps)
============================================================ */

/* ------------------------------
   SECTION FADE-IN ANIMATION
------------------------------ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

// Fade-in effect applied to all <section> blocks
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});


/* ------------------------------
   GOOGLE MAPS INITIALIZATION
------------------------------ */
function initXReachMap() {
  const mapContainer = document.getElementById("xreach-map");
  if (!mapContainer) return; // Safely exit if the element doesn't exist

  // Correct office location
  const xreachLocation = { lat: 38.30393, lng: -77.51356 };

  // Create map instance
  const map = new google.maps.Map(mapContainer, {
    center: xreachLocation,
    zoom: 16,
    mapId: "XREACH_MAIN_MAP",
    disableDefaultUI: false
  });

  // Marker for XReach office
  new google.maps.Marker({
    position: xreachLocation,
    map,
    title: "XReach LLC — Fredericksburg Office"
  });
}

// Expose function for Google Maps callback
window.initXReachMap = initXReachMap;
