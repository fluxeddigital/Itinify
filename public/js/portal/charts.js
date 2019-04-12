var Charts = function() {};
Charts.prototype.init = function() {}, Charts.prototype.pieChart = function(t, n) {
    var e, l, a, r, s, i, o, c, u, h, g, d, p = document.getElementById(t),
        m = document.createElement("div");
    m.classList.add("chart-responsive"), sectors = (a = [], r = (e = n).size / 2, d = g = h = u = c = o = i = s = 0, e.sectors.map(function(t, e) {
        s = 360 * t.percentage / 100, i = (l = 180 < s ? 360 - s : s) * Math.PI / 180, o = Math.sqrt(2 * r * r - 2 * r * r * Math.cos(i)), c = l <= 90 ? r * Math.sin(i) : r * Math.sin((180 - l) * Math.PI / 180), u = Math.sqrt(o * o - c * c), g = u, s <= 180 ? (h = r + c, arcSweep = 0) : (h = r - c, arcSweep = 1), a.push({
            percentage: t.percentage,
            name: t.name,
            color: t.color,
            arcSweep: arcSweep,
            L: r,
            X: h,
            Y: g,
            R: d
        }), d += s
    }), a);
    var w = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    w.setAttributeNS(null, "style", "width: " + n.size + "px; height: " + n.size + "px"), document.body.contains(p) && (m.appendChild(w), p.appendChild(m)), sectors.map(function(t) {
        var e = document.createElementNS("http://www.w3.org/2000/svg", "path");
        e.setAttributeNS(null, "fill", t.color), e.setAttributeNS(null, "d", "M" + t.L + "," + t.L + " L" + t.L + ",0 A" + t.L + "," + t.L + " 1 " + t.arcSweep + ",1 " + t.X + ", " + t.Y + " z"), e.setAttributeNS(null, "transform", "rotate(" + t.R + ", " + t.L + ", " + t.L + ")");
        var l = document.createElement("p"),
            a = document.createElement("i");
        a.classList.add("fa", "fa-circle", "m-r-5"), a.style.color = t.color, l.appendChild(a), l.innerHTML += t.name + ": " + t.percentage + "%", document.body.contains(p) && 1 == n.labels && p.appendChild(l), w.appendChild(e)
    })
}, Charts.prototype.generateAreaChart = function(g, d) {
    var t, p, m, e, w, l = document.createElement("div"),
        a = document.getElementById(g),
        b = 10,
        n = d.width,
        r = d.height,
        A = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    if (l.classList.add("chart-responsive"), document.body.contains(a)) var s = a.parentNode.offsetWidth,
        i = a.parentNode.offsetHeight; - 1 !== n.toString().indexOf("%") ? (t = !0, n = n.substring(0, n.length - 1) * s / 100) : t = !1, m = (n - 3 * (p = 6 * n / 100)) / (d.xAxis.categories.length - 1), A.setAttributeNS(null, "style", "width: " + n + "px; height: " + r + "px"), e = -1 !== r.toString().indexOf("%") ? ((r = r.substring(0, r.length - 1) * i / 100) - 20 - b) / (d.yAxis.labels.length - 1) : (r - 20 - b) / (d.yAxis.labels.length - 1), A.setAttributeNS(null, "style", "width: " + n + "px; height: " + r + "px");
    var o, x = k(d.yAxis.labels.length, e)[k(d.yAxis.labels.length, e).length - 1],
        c = k(d.xAxis.categories.length, m)[k(d.xAxis.categories.length, m).length - 1],
        S = x / d.yAxis.labels[d.yAxis.labels.length - 1];
    series = (o = [], d.series.map(function(t, e) {
        o.push({
            name: t.name,
            data: t.data,
            color: t.color
        })
    }), o);
    var N = document.createElementNS("http://www.w3.org/2000/svg", "g");
    N.setAttributeNS(null, "class", "markers");
    var f = document.createElementNS("http://www.w3.org/2000/svg", "g");
    f.setAttributeNS(null, "class", "circles");
    var u = document.createElementNS("http://www.w3.org/2000/svg", "g"),
        h = document.createElementNS("http://www.w3.org/2000/svg", "g");
    u.setAttributeNS(null, "class", "grid x-grid"), h.setAttributeNS(null, "class", "grid y-grid");
    for (var v = 0; v < d.xAxis.categories.length; v++) {
        var y = document.createElementNS("http://www.w3.org/2000/svg", "line");
        y.setAttributeNS(null, "x1", k(d.xAxis.categories.length, m)[v] + p), y.setAttributeNS(null, "x2", k(d.xAxis.categories.length, m)[v] + p), y.setAttributeNS(null, "y1", b), y.setAttributeNS(null, "y2", x), u.appendChild(y)
    }
    for (v = 0; v < d.yAxis.labels.length; v++) {
        var C = document.createElementNS("http://www.w3.org/2000/svg", "line");
        C.setAttributeNS(null, "x1", p), C.setAttributeNS(null, "x2", c + p), C.setAttributeNS(null, "y1", b + k(d.yAxis.labels.length, e)[v]), C.setAttributeNS(null, "y2", b + k(d.yAxis.labels.length, e)[v]), h.appendChild(C)
    }
    A.appendChild(u), A.appendChild(h), series.map(function(t) {
        var e = document.createElementNS("http://www.w3.org/2000/svg", "path"),
            l = document.createElementNS("http://www.w3.org/2000/svg", "g"),
            a = k(d.xAxis.categories.length, m),
            n = [];
        a.unshift(0), n[0] = x + b, l.setAttributeNS(null, "class", "points");
        for (var r = 0; r < t.data.length; r++) {
            n.push(b + x - S * t.data[r]);
            var s = document.createElementNS("http://www.w3.org/2000/svg", "text");
            s.textContent = t.name + ": " + t.data[r], s.setAttributeNS(null, "fill", "#616161"), s.setAttributeNS(null, "class", "marker marker-" + g), s.setAttributeNS(null, "y", b + x - S * t.data[r] + 3), s.setAttributeNS(null, "x", k(d.xAxis.categories.length, m)[r] + p + p / 4), s.setAttributeNS(null, "fill-opacity", 0), N.appendChild(s);
            var i = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            i.setAttributeNS(null, "cx", k(d.xAxis.categories.length, m)[r] + p), i.setAttributeNS(null, "cy", b + x - S * t.data[r]), i.setAttribute("data-value", t.data[r]), i.setAttribute("fill", "#ffffff"), l.appendChild(i), 1 == d.tooltips && f.appendChild(l)
        }
        w = "M";
        var o = [],
            c = k(d.xAxis.categories.length, m)[k(d.xAxis.categories.length, m).length - 1] + p,
            u = x - S * t.data[t.data.length - 1],
            h = b + x;
        for (r = 0; r < a.length; r++) a[r] = p + a[r] + "," + n[r], o.push(a[r]);
        for (o.push(c + "," + u), o = o.join(" L");
            "0" === o.charAt(0);) o = o.substr(1);
        w = w + o + " L" + c + "," + h + " Z", e.setAttributeNS(null, "d", w), e.setAttributeNS(null, "fill", t.color), A.appendChild(e), A.appendChild(f), 1 == d.tooltips && A.appendChild(N)
    });
    var E = document.createElementNS("http://www.w3.org/2000/svg", "g"),
        L = document.createElementNS("http://www.w3.org/2000/svg", "g");
    E.setAttributeNS(null, "class", "labels x-labels"), L.setAttributeNS(null, "class", "labels y-labels");
    for (v = 0; v < d.xAxis.categories.length; v++) {
        var B = document.createElementNS("http://www.w3.org/2000/svg", "text");
        B.setAttributeNS(null, "x", k(d.xAxis.categories.length, m)[v] + p), B.setAttributeNS(null, "y", 10 + x + 20), 1 == d.labels && (B.textContent = d.xAxis.categories[v], E.appendChild(B))
    }
    for (v = 0; v < d.yAxis.labels.length; v++) {
        var M = document.createElementNS("http://www.w3.org/2000/svg", "text");
        M.setAttributeNS(null, "x", p / 2);
        var X = k(d.yAxis.labels.length, e).reverse();
        M.setAttributeNS(null, "y", 10 + X[v] + 10), 1 == d.labels && (M.textContent = d.yAxis.labels[v], L.appendChild(M))
    }

    function k(t, e) {
        for (var l = [], a = 0; a < t; a++) l.push(a * e);
        return l
    }
    A.appendChild(E), A.appendChild(L), document.body.contains(a) && (t ? a.appendChild(A) : (l.appendChild(A), a.appendChild(l))), document.body.contains(a) && (a.onmouseover = function(t) {
        var e = this.getBoundingClientRect().left;
        if (t.pageX >= e && t.pageX <= e + this.offsetWidth) {
            for (var l = document.getElementsByTagNameNS("http://www.w3.org/2000/svg", "circle"), a = [], n = 0; n < l.length; n++) {
                a.push(l[n].getAttribute("cx"));
                for (var r = 0; r < a.length; r++) a[r] >= t.pageX - e - m / 2 && a[r] <= t.pageX - e + m / 2 ? l[n].setAttributeNS(null, "r", 5) : l[n].setAttributeNS(null, "r", 0)
            }
            var s = document.getElementsByClassName("marker-" + g),
                i = [];
            for (n = 0; n < s.length; n++) {
                i.push(s[n].getAttribute("x"));
                for (r = 0; r < i.length; r++) i[r] >= t.pageX - e - m / 2 && i[r] <= t.pageX - e + m / 2 && 1 == d.tooltips ? s[n].setAttributeNS(null, "fill-opacity", 1) : s[n].setAttributeNS(null, "fill-opacity", 0)
            }
        }
    })
}, Charts.prototype.areaChart = function(t, e) {
    if (document.body.contains(document.getElementById(t))) {
        function l() {
            setTimeout(function() {
                document.getElementById(t).innerHTML = "", charts.generateAreaChart(t, e)
            }, 200)
        }
        l(), musa.menuToggle.addEventListener("click", l, !1), window.addEventListener("resize", function() {
            l()
        })
    }
}, Charts.prototype.generateColumnChart = function(s, i) {
    var t, n, o, e, l = document.createElement("div"),
        a = document.getElementById(s),
        r = i.barWidth,
        c = i.width,
        u = i.height,
        h = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    if (l.classList.add("chart-responsive"), document.body.contains(a)) var g = a.parentNode.offsetWidth,
        d = a.parentNode.offsetHeight; - 1 !== c.toString().indexOf("%") ? (t = !0, c = c.substring(0, c.length - 1) * g / 100) : t = !1, o = (c - 3 * (n = 6 * c / 100)) / (i.xAxis.categories.length - 1), h.setAttributeNS(null, "style", "width: " + c + "px; height: " + u + "px"), e = -1 !== u.toString().indexOf("%") ? ((u = u.substring(0, u.length - 1) * d / 100) - 20 - 10) / (i.yAxis.labels.length - 1) : (u - 20 - 10) / (i.yAxis.labels.length - 1), h.setAttributeNS(null, "style", "width: " + c + "px; height: " + u + "px");
    var p, m = M(i.yAxis.labels.length, e)[M(i.yAxis.labels.length, e).length - 1],
        w = M(i.xAxis.categories.length, o)[M(i.xAxis.categories.length, o).length - 1],
        b = m / i.yAxis.labels[i.yAxis.labels.length - 1];
    series = (p = [], i.series.map(function(t, e) {
        p.push({
            name: t.name,
            data: t.data,
            color: t.color
        })
    }), p);
    var A = document.createElementNS("http://www.w3.org/2000/svg", "g");
    A.setAttributeNS(null, "class", "markers");
    var x = document.createElementNS("http://www.w3.org/2000/svg", "g"),
        S = document.createElementNS("http://www.w3.org/2000/svg", "g");
    x.setAttributeNS(null, "class", "grid x-grid"), S.setAttributeNS(null, "class", "grid y-grid");
    for (var N = 0; N < i.xAxis.categories.length; N++) {
        var f = document.createElementNS("http://www.w3.org/2000/svg", "line");
        f.setAttributeNS(null, "x1", M(i.xAxis.categories.length, o)[N] + n), f.setAttributeNS(null, "x2", M(i.xAxis.categories.length, o)[N] + n), f.setAttributeNS(null, "y1", 10), f.setAttributeNS(null, "y2", m), x.appendChild(f)
    }
    for (N = 0; N < i.yAxis.labels.length; N++) {
        var v = document.createElementNS("http://www.w3.org/2000/svg", "line");
        v.setAttributeNS(null, "x1", n), v.setAttributeNS(null, "x2", w + n + r), v.setAttributeNS(null, "y1", 10 + M(i.yAxis.labels.length, e)[N]), v.setAttributeNS(null, "y2", 10 + M(i.yAxis.labels.length, e)[N]), S.appendChild(v)
    }
    h.appendChild(x), h.appendChild(S), series.map(function(t) {
        for (var e = 0; e < t.data.length; e++) {
            var l = document.createElementNS("http://www.w3.org/2000/svg", "text");
            l.textContent = t.name + ": " + t.data[e], l.setAttributeNS(null, "fill", "#616161"), l.setAttributeNS(null, "class", "marker marker-" + s), l.setAttributeNS(null, "y", m - b * t.data[e] + 3), l.setAttributeNS(null, "x", M(i.xAxis.categories.length, o)[e] + n), l.setAttributeNS(null, "fill-opacity", 0), A.appendChild(l);
            var a = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            a.setAttributeNS(null, "x", M(t.data.length, o)[e] + n), a.setAttributeNS(null, "y", -(10 + m)), a.setAttributeNS(null, "height", b * t.data[e]), a.setAttributeNS(null, "width", r), a.setAttributeNS(null, "transform", "scale(1,-1)"), a.setAttributeNS(null, "fill", t.color), h.appendChild(a)
        }
        1 == i.tooltips && h.appendChild(A)
    });
    var y = document.createElementNS("http://www.w3.org/2000/svg", "g"),
        C = document.createElementNS("http://www.w3.org/2000/svg", "g");
    y.setAttributeNS(null, "class", "labels x-labels"), C.setAttributeNS(null, "class", "labels y-labels");
    for (N = 0; N < i.xAxis.categories.length; N++) {
        var E = document.createElementNS("http://www.w3.org/2000/svg", "text");
        E.setAttributeNS(null, "x", M(i.xAxis.categories.length, o)[N] + r / 2 + n), E.setAttributeNS(null, "y", 10 + m + 20), 1 == i.labels && (E.textContent = i.xAxis.categories[N], y.appendChild(E))
    }
    for (N = 0; N < i.yAxis.labels.length; N++) {
        var L = document.createElementNS("http://www.w3.org/2000/svg", "text");
        L.setAttributeNS(null, "x", n / 2);
        var B = M(i.yAxis.labels.length, e).reverse();
        L.setAttributeNS(null, "y", 10 + B[N] + 10), 1 == i.labels && (L.textContent = i.yAxis.labels[N], C.appendChild(L))
    }

    function M(t, e) {
        for (var l = [], a = 0; a < t; a++) l.push(a * e);
        return l
    }
    h.appendChild(y), h.appendChild(C), document.body.contains(a) && (t ? a.appendChild(h) : (l.appendChild(h), a.appendChild(l))), document.body.contains(a) && (a.onmouseover = function(t) {
        var e = this.getBoundingClientRect().left;
        if (t.pageX >= e && t.pageX <= e + this.offsetWidth)
            for (var l = document.getElementsByClassName("marker-" + s), a = [], n = 0; n < l.length; n++) {
                a.push(l[n].getAttribute("x"));
                for (var r = 0; r < a.length; r++) a[r] >= t.pageX - e - o / 2 && a[r] <= t.pageX - e + o / 2 && 1 == i.tooltips ? l[n].setAttributeNS(null, "fill-opacity", 1) : l[n].setAttributeNS(null, "fill-opacity", 0)
            }
    })
}, Charts.prototype.columnChart = function(t, e) {
    if (document.body.contains(document.getElementById(t))) {
        function l() {
            setTimeout(function() {
                document.getElementById(t).innerHTML = "", charts.generateColumnChart(t, e)
            }, 300)
        }
        l(), musa.menuToggle.addEventListener("click", l, !1), window.addEventListener("resize", function() {
            l()
        })
    }
};
var charts = new Charts;
charts.init(), charts.pieChart("pieChart", {
    size: 200,
    labels: !0,
    sectors: [{
        percentage: 65,
        name: "Accepted",
        color: "#FF5B5E"
    }, {
        percentage: 35,
        name: "Open",
        color: "#36404a"
    }]
}), charts.pieChart("pieChart1", {
    size: 50,
    labels: !1,
    sectors: [{
        percentage: 30,
        name: "Serie 1",
        color: "#4DD0E1"
    }, {
        percentage: 70,
        name: "Serie 2",
        color: "#fa0"
    }]
}), charts.areaChart("areaChart", {
    width: "95%",
    height: 300,
    tooltips: !0,
    labels: !0,
    xAxis: {
        categories: ["2012", "2013", "2014", "2015", "2016", "2017"]
    },
    yAxis: {
        labels: ["0", "5", "10", "15", "20"]
    },
    series: [{
        name: "Serie 1",
        data: [2, 9, 10, 7.3, 5.5, 17],
        color: "#efecf1"
    }, {
        name: "Serie 2",
        data: [7.7, 6, 7.8, 4, 2, 15],
        color: "#4DD0E1"
    }]
}), charts.areaChart("areaChart1", {
    width: 80,
    height: 80,
    tooltips: !1,
    labels: !1,
    xAxis: {
        categories: ["2012", "2013", "2014", "2015", "2016", "2017"]
    },
    yAxis: {
        labels: ["0", "5", "10", "15", "20"]
    },
    series: [{
        name: "Samsung",
        data: [7.7, 6, 7.8, 4, 2, 15],
        color: "#0aa89e"
    }]
}), charts.areaChart("exampleAreaChart", {
    width: "95%",
    height: 300,
    tooltips: !0,
    labels: !0,
    xAxis: {
        categories: ["2012", "2013", "2014", "2015", "2016", "2017"]
    },
    yAxis: {
        labels: ["0", "5", "10", "15", "20"]
    },
    series: [{
        name: "Serie 1",
        data: [2, 9, 10, 7.3, 5.5, 17],
        color: "#efecf1"
    }, {
        name: "Serie 2",
        data: [7.7, 6, 7.8, 4, 2, 15],
        color: "#4DD0E1"
    }]
}), charts.columnChart("columnChart", {
    width: "90%",
    height: 300,
    barWidth: 18,
    tooltips: !0,
    labels: !0,
    xAxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yAxis: {
        labels: ["0", "20", "40", "60", "80", "100"]
    },
    series: [{
        name: "Sent",
        data: [15, 18, 22, 29, 39, 37, 55, 67, 61, 50, 42, 42],
        color: "#FF5B5E"
    }]
}), charts.columnChart("columnChart1", {
    width: 80,
    height: 80,
    barWidth: 7,
    tooltips: !1,
    labels: !1,
    xAxis: {
        categories: ["0.0", "1.0", "2.0", "3.0", "4.0", "5.0", "6.0", "7.0"]
    },
    yAxis: {
        labels: ["0", "20", "40", "60"]
    },
    series: [{
        name: "Apple",
        data: [5, 18, 20, 28, 35, 40, 15, 7],
        color: "#6d5cae"
    }]
});
