WeddingRouter = Backbone.Router.extend({
  routes: {
    "*actions": "showSection"
  },

  showSection: function(sectionName) {
    
  }
});
router = new WeddingRouter;
Backbone.history.start();


$(function() {
  var penantsL = d3.select(".left.penants"),
      penantsR = d3.select(".right.penants"),
      fills  = $("svg pattern").map(function() { return $(this).attr("id") });
      width = parseInt($(penantsR[0]).css("width"));

  // basic parameters
  var anglesDeg = [15, 30, 45, 60, 75],
      cxL = -100,
      cy  = -400,
      r   = 600,
      l   = 100,
      penantAngle = 0.08;

  // derived parameters
  var anglesRad = _.map(anglesDeg, function(deg) { return deg * Math.PI / 180 }),
      cxR = width - cxL,
      rs = [r, r+l, r];

  var penantOutlineL = d3.svg.line()
    .x(function(d, i) { return cxL + rs[i] * Math.sin(d); })
    .y(function(d, i) { return cy  + rs[i] * Math.cos(d); });
  var penantOutlineR = d3.svg.line()
    .x(function(d, i) { return cxR + rs[i] * Math.sin(d); })
    .y(function(d, i) { return cy  + rs[i] * Math.cos(d); });

  penantsL.append("circle")
    .attr("cx", cxL)
    .attr("cy", cy)
    .attr("r", r)
    .style("stroke", "#000")
    .classed("rope", true);
  penantsR.append("circle")
    .attr("cx", cxR)
    .attr("cy", cy)
    .attr("r", r)
    .style("stroke", "#000")
    .classed("rope", true)

  var iFill = 0;
  _.each(anglesRad, function(angle, i) {
    var angles = [angle - penantAngle, angle, angle + penantAngle];
    penantsL.append("path")
      .attr("fill", "url(#" + fills[iFill++] + ")")
      .classed("penant", true)
      .attr("d", penantOutlineL(angles));
  });

  _.each(anglesRad, function(angle, i) {
    angle = -1 * angle;
    var angles = [angle - penantAngle, angle, angle + penantAngle];
    penantsR.append("path")
      .attr("fill", "url(#" + fills[iFill++] + ")")
      .attr("d", penantOutlineR(angles));
  });
});

