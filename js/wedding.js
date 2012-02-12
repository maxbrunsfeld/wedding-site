WeddingRouter = Backbone.Router.extend({
  routes: {
    "*actions": "showSection"
  },

  showSection: function(sectionName) {
    
  }
});

router = new WeddingRouter;
Backbone.history.start();


