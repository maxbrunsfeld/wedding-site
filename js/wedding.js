WeddingRouter = Backbone.Router.extend({
  routes: {
    "*actions": "showSection"
  },

  showSection: function(sectionName) {
    sectionName || (sectionName = "welcome");
    $(".section").hide();
    $(".links a").removeClass("selected");
    $(".links a[href='#" + sectionName + "']").addClass("selected");
    $(".section#" + sectionName).show();
  }
});

router = new WeddingRouter;
Backbone.history.start();


$(function() {
  var params = {
    angles: [12, 24, 36, 48],
    cy: -350,
    r: 500,
    penantLength: 90,
    penantAngle: 10,
    width: parseInt($("svg.penants").css("width"))
  };

  var left = _.extend({}, params, {
    container: d3.select(".left.penants"),
    cx: -100,
    fills: ["gray1", "green1", "yellow2", "white2"]
  });

  var right = _.extend({}, params, {
    container: d3.select(".right.penants"),
    angles: _.map(params.angles, function(x) { return -x }),
    cx: params.width - left.cx,
    fills: ["white1", "yellow1", "red1", "blue1"]
  });

  _.each([left, right], drawPenants);
});

function drawPenants(group) {
  group.container.append("circle")
    .attr("cx", group.cx)
    .attr("cy", group.cy)
    .attr("r", group.r)
    .style("stroke", "#000")
    .style("stroke-width", 1)
    .classed("rope", true);

  var pi = Math.PI;
  var rs = [group.r, group.r + group.penantLength, group.r];
  var penantOutline = d3.svg.line()
    .x(function(d, i) { return group.cx + rs[i] * Math.sin(d * pi/180); })
    .y(function(d, i) { return group.cy + rs[i] * Math.cos(d * pi/180); });

  _.each(group.angles, function(angle, i) {
    var angles = [angle - group.penantAngle/2, angle, angle + group.penantAngle/2];
    group.container.append("path")
      .classed("penant", true)
      .style("fill", "url(#" + group.fills[i] + ")")
      .style("stroke", "#aaa")
      .attr("d", penantOutline(angles));
  });
}
