/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    // That's the first suit of tests, 
    // and is all related to tests which do not manipulate the DOM.
    describe("RSS Feeds", function() {
      // Checking if all feeds are defined.
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      // Checking if all URL's of the feeds are defined.
      it("each url is defined", function() {
        allFeeds.forEach(feed => {
          expect(feed.url).toBeDefined();
        });
      });

      // Checking if all names of the feeds are defined.
      it("each name is defined", function() {
        allFeeds.forEach(feed => {
          expect(feed.name).toBeDefined();
        });
      });
    });

    // This test suit is related to the DOM 
    // and checks the manu's functionalities.
    describe("The Menu", function() {
      // Checking if the menu is automatically hidden in the beginning.
      it("is hidden", function() {
        expect($("body").hasClass("menu-hidden")).toBe(true);
      });
      
      // Checking if the menu changes the visibility when clicked.
      it("changes visibility", function() {
        let currentStatus = $("body").hasClass("menu-hidden");

        // simulating a click.
        $(".menu-icon-link").trigger("click");

        expect($("body").hasClass("menu-hidden")).not.toBe(currentStatus);

        // returning to first menu position.
        $(".menu-icon-link").trigger("click");
      });
    });

    // This suit is asynchronous and is related to the requests 
    // which are made to the API (The focus is to check the initial entries).
    describe("Initial entries", function() {

      // It's being used beforeEach so the asynchronism can be
      // controlled by the done().
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      // Checking if there's at least one entry.
      it("are created", function() {
        expect($("a.entry-link").length).toBeGreaterThan(0);
      });
    });

    // This suit is asynchronous and is related to the requests 
    // which are made to the API (The focus is to check the changes between different feeds).
    describe("New Feed Selection", function() {

      let firstFeed, secondFeed;

      // It's being used beforeEach so the asynchronism can be
      // controlled by the done().
      beforeEach(function(done) {
        loadFeed(0, function() {
          firstFeed = $('.feed').html();
          // The loadFeed function is called inside another same call
          // because it's necessary to double call sequentially and save the feed value.
          loadFeed(1, function() {
            secondFeed = $('.feed').html();
            done();
          });
        });
      });

      // Checking if one feed is different to the previous one called.
      it("is different", function() {
        expect(firstFeed).not.toBe(secondFeed);
      });
    });
  })()
);
