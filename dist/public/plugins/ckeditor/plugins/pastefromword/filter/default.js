"use strict";

/*
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function () {
  function u() {
    return !1;
  }function x(a, b) {
    var c,
        d = [];a.filterChildren(b);for (c = a.children.length - 1; 0 <= c; c--) {
      d.unshift(a.children[c]), a.children[c].remove();
    }c = a.attributes;var f = a,
        e = !0,
        h;for (h in c) {
      if (e) e = !1;else {
        var l = new CKEDITOR.htmlParser.element(a.name);l.attributes[h] = c[h];f.add(l);f = l;delete c[h];
      }
    }for (c = 0; c < d.length; c++) {
      f.add(d[c]);
    }
  }var g,
      k,
      t,
      q,
      n = CKEDITOR.tools,
      y = ["o:p", "xml", "script", "meta", "link"],
      w = {},
      v = 0;CKEDITOR.plugins.pastefromword = {};CKEDITOR.cleanWord = function (a, b) {
    var c = Boolean(a.match(/mso-list:\s*l\d+\s+level\d+\s+lfo\d+/));
    CKEDITOR.plugins.clipboard.isCustomDataTypesSupported && (a = CKEDITOR.plugins.pastefromword.styles.inliner.inline(a).getBody().getHtml());a = a.replace(/<!\[/g, "\x3c!--[").replace(/\]>/g, "]--\x3e");var d = CKEDITOR.htmlParser.fragment.fromHtml(a);q = new CKEDITOR.htmlParser.filter({ root: function root(e) {
        e.filterChildren(q);CKEDITOR.plugins.pastefromword.lists.cleanup(g.createLists(e));
      }, elementNames: [[/^\?xml:namespace$/, ""], [/^v:shapetype/, ""], [new RegExp(y.join("|")), ""]], elements: { a: function a(e) {
          if (e.attributes.name) {
            if ("_GoBack" == e.attributes.name) {
              delete e.name;return;
            }if (e.attributes.name.match(/^OLE_LINK\d+$/)) {
              delete e.name;return;
            }
          }if (e.attributes.href && e.attributes.href.match(/#.+$/)) {
            var a = e.attributes.href.match(/#(.+)$/)[1];w[a] = e;
          }e.attributes.name && w[e.attributes.name] && (e = w[e.attributes.name], e.attributes.href = e.attributes.href.replace(/.*#(.*)$/, "#$1"));
        }, div: function div(e) {
          k.createStyleStack(e, q, b);
        }, img: function img(e) {
          if (e.parent && e.parent.attributes) {
            var a = e.parent.attributes;(a = a.style || a.STYLE) && a.match(/mso\-list:\s?Ignore/) && (e.attributes["cke-ignored"] = !0);
          }k.mapStyles(e, { width: function width(a) {
              k.setStyle(e, "width", a + "px");
            }, height: function height(a) {
              k.setStyle(e, "height", a + "px");
            } });e.attributes.src && e.attributes.src.match(/^file:\/\//) && e.attributes.alt && e.attributes.alt.match(/^https?:\/\//) && (e.attributes.src = e.attributes.alt);
        }, p: function p(a) {
          a.filterChildren(q);if (a.attributes.style && a.attributes.style.match(/display:\s*none/i)) return !1;if (g.thisIsAListItem(b, a)) t.isEdgeListItem(b, a) && t.cleanupEdgeListItem(a), g.convertToFakeListItem(b, a), n.array.reduce(a.children, function (a, e) {
            "p" === e.name && (0 < a && new CKEDITOR.htmlParser.element("br").insertBefore(e), e.replaceWithChildren(), a += 1);return a;
          }, 0);else {
            var c = a.getAscendant(function (a) {
              return "ul" == a.name || "ol" == a.name;
            }),
                d = n.parseCssText(a.attributes.style);c && !c.attributes["cke-list-level"] && d["mso-list"] && d["mso-list"].match(/level/) && (c.attributes["cke-list-level"] = d["mso-list"].match(/level(\d+)/)[1]);
          }k.createStyleStack(a, q, b);
        }, pre: function pre(a) {
          g.thisIsAListItem(b, a) && g.convertToFakeListItem(b, a);k.createStyleStack(a, q, b);
        }, h1: function h1(a) {
          g.thisIsAListItem(b, a) && g.convertToFakeListItem(b, a);k.createStyleStack(a, q, b);
        }, h2: function h2(a) {
          g.thisIsAListItem(b, a) && g.convertToFakeListItem(b, a);k.createStyleStack(a, q, b);
        }, h3: function h3(a) {
          g.thisIsAListItem(b, a) && g.convertToFakeListItem(b, a);k.createStyleStack(a, q, b);
        }, h4: function h4(a) {
          g.thisIsAListItem(b, a) && g.convertToFakeListItem(b, a);k.createStyleStack(a, q, b);
        }, h5: function h5(a) {
          g.thisIsAListItem(b, a) && g.convertToFakeListItem(b, a);k.createStyleStack(a, q, b);
        }, h6: function h6(a) {
          g.thisIsAListItem(b, a) && g.convertToFakeListItem(b, a);k.createStyleStack(a, q, b);
        }, font: function font(a) {
          if (a.getHtml().match(/^\s*$/)) return new CKEDITOR.htmlParser.text(" ").insertAfter(a), !1;b && !0 === b.config.pasteFromWordRemoveFontStyles && a.attributes.size && delete a.attributes.size;CKEDITOR.dtd.tr[a.parent.name] && CKEDITOR.tools.arrayCompare(CKEDITOR.tools.objectKeys(a.attributes), ["class", "style"]) ? k.createStyleStack(a, q, b) : x(a, q);
        }, ul: function ul(a) {
          if (c) return "li" == a.parent.name && 0 === n.indexOf(a.parent.children, a) && k.setStyle(a.parent, "list-style-type", "none"), g.dissolveList(a), !1;
        }, li: function li(a) {
          t.correctLevelShift(a);c && (a.attributes.style = k.normalizedStyles(a, b), k.pushStylesLower(a));
        }, ol: function ol(a) {
          if (c) return "li" == a.parent.name && 0 === n.indexOf(a.parent.children, a) && k.setStyle(a.parent, "list-style-type", "none"), g.dissolveList(a), !1;
        }, span: function span(a) {
          a.filterChildren(q);a.attributes.style = k.normalizedStyles(a, b);if (!a.attributes.style || a.attributes.style.match(/^mso\-bookmark:OLE_LINK\d+$/) || a.getHtml().match(/^(\s|&nbsp;)+$/)) {
            for (var c = a.children.length - 1; 0 <= c; c--) {
              a.children[c].insertAfter(a);
            }return !1;
          }a.attributes.style.match(/FONT-FAMILY:\s*Symbol/i) && a.forEach(function (a) {
            a.value = a.value.replace(/&nbsp;/g, "");
          }, CKEDITOR.NODE_TEXT, !0);k.createStyleStack(a, q, b);
        }, table: function table(a) {
          a._tdBorders = {};a.filterChildren(q);var b,
              c = 0,
              d;for (d in a._tdBorders) {
            a._tdBorders[d] > c && (c = a._tdBorders[d], b = d);
          }k.setStyle(a, "border", b);c = (b = a.parent) && b.parent;if (b.name && "div" === b.name && b.attributes.align && 1 === n.objectKeys(b.attributes).length && 1 === b.children.length) {
            a.attributes.align = b.attributes.align;d = b.children.splice(0);a.remove();for (a = d.length - 1; 0 <= a; a--) {
              c.add(d[a], b.getIndex());
            }b.remove();
          }
        }, td: function td(a) {
          var c = a.getAscendant("table"),
              d = c._tdBorders,
              f = ["border", "border-top", "border-right", "border-bottom", "border-left"],
              c = n.parseCssText(c.attributes.style),
              m = c.background || c.BACKGROUND;m && k.setStyle(a, "background", m, !0);(c = c["background-color"] || c["BACKGROUND-COLOR"]) && k.setStyle(a, "background-color", c, !0);var c = n.parseCssText(a.attributes.style),
              p;for (p in c) {
            m = c[p], delete c[p], c[p.toLowerCase()] = m;
          }for (p = 0; p < f.length; p++) {
            c[f[p]] && (m = c[f[p]], d[m] = d[m] ? d[m] + 1 : 1);
          }k.createStyleStack(a, q, b, /margin|text\-align|padding|list\-style\-type|width|height|border|white\-space|vertical\-align|background/i);
        }, "v:imagedata": u, "v:shape": function vShape(a) {
          var b = !1;a.parent.getFirst(function (c) {
            "img" == c.name && c.attributes && c.attributes["v:shapes"] == a.attributes.id && (b = !0);
          });if (b) return !1;var c = "";a.forEach(function (a) {
            a.attributes && a.attributes.src && (c = a.attributes.src);
          }, CKEDITOR.NODE_ELEMENT, !0);a.filterChildren(q);a.name = "img";a.attributes.src = a.attributes.src || c;delete a.attributes.type;
        }, style: function style() {
          return !1;
        }, object: function object(a) {
          return !(!a.attributes || !a.attributes.data);
        } }, attributes: { style: function style(a, c) {
          return k.normalizedStyles(c, b) || !1;
        }, "class": function _class(a) {
          a = a.replace(/(el\d+)|(font\d+)|msonormal|msolistparagraph\w*/ig, "");return "" === a ? !1 : a;
        }, cellspacing: u, cellpadding: u, border: u, "v:shapes": u, "o:spid": u }, comment: function comment(a) {
        a.match(/\[if.* supportFields.*\]/) && v++;"[endif]" == a && (v = 0 < v ? v - 1 : 0);return !1;
      }, text: function text(a, b) {
        if (v) return "";var c = b.parent && b.parent.parent;return c && c.attributes && c.attributes.style && c.attributes.style.match(/mso-list:\s*ignore/i) ? a.replace(/&nbsp;/g, " ") : a;
      } });var f = new CKEDITOR.htmlParser.basicWriter();q.applyTo(d);d.writeHtml(f);return f.getHtml();
  };CKEDITOR.plugins.pastefromword.styles = { setStyle: function setStyle(a, b, c, d) {
      var f = n.parseCssText(a.attributes.style);d && f[b] || ("" === c ? delete f[b] : f[b] = c, a.attributes.style = CKEDITOR.tools.writeCssText(f));
    },
    mapStyles: function mapStyles(a, b) {
      for (var c in b) {
        if (a.attributes[c]) {
          if ("function" === typeof b[c]) b[c](a.attributes[c]);else k.setStyle(a, b[c], a.attributes[c]);delete a.attributes[c];
        }
      }
    }, normalizedStyles: function normalizedStyles(a, b) {
      var c = "background-color:transparent border-image:none color:windowtext direction:ltr mso- text-indent visibility:visible div:border:none".split(" "),
          d = "font-family font font-size color background-color line-height text-decoration".split(" "),
          f = function f() {
        for (var a = [], b = 0; b < arguments.length; b++) {
          arguments[b] && a.push(arguments[b]);
        }return -1 !== n.indexOf(c, a.join(":"));
      },
          e = b && !0 === b.config.pasteFromWordRemoveFontStyles,
          h = n.parseCssText(a.attributes.style);"cke:li" == a.name && h["TEXT-INDENT"] && h.MARGIN && (a.attributes["cke-indentation"] = g.getElementIndentation(a), h.MARGIN = h.MARGIN.replace(/(([\w\.]+ ){3,3})[\d\.]+(\w+$)/, "$10$3"));for (var l = n.objectKeys(h), r = 0; r < l.length; r++) {
        var m = l[r].toLowerCase(),
            p = h[l[r]],
            k = CKEDITOR.tools.indexOf;(e && -1 !== k(d, m.toLowerCase()) || f(null, m, p) || f(null, m.replace(/\-.*$/, "-")) || f(null, m) || f(a.name, m, p) || f(a.name, m.replace(/\-.*$/, "-")) || f(a.name, m) || f(p)) && delete h[l[r]];
      }return CKEDITOR.tools.writeCssText(h);
    }, createStyleStack: function createStyleStack(a, b, c, d) {
      var f = [];a.filterChildren(b);for (b = a.children.length - 1; 0 <= b; b--) {
        f.unshift(a.children[b]), a.children[b].remove();
      }k.sortStyles(a);b = n.parseCssText(k.normalizedStyles(a, c));c = a;var e = "span" === a.name,
          h;for (h in b) {
        if (!h.match(d || /margin|text\-align|width|border|padding/i)) if (e) e = !1;else {
          var l = new CKEDITOR.htmlParser.element("span");l.attributes.style = h + ":" + b[h];c.add(l);c = l;delete b[h];
        }
      }CKEDITOR.tools.isEmpty(b) ? delete a.attributes.style : a.attributes.style = CKEDITOR.tools.writeCssText(b);for (b = 0; b < f.length; b++) {
        c.add(f[b]);
      }
    }, sortStyles: function sortStyles(a) {
      for (var b = ["border", "border-bottom", "font-size", "background"], c = n.parseCssText(a.attributes.style), d = n.objectKeys(c), f = [], e = [], h = 0; h < d.length; h++) {
        -1 !== n.indexOf(b, d[h].toLowerCase()) ? f.push(d[h]) : e.push(d[h]);
      }f.sort(function (a, c) {
        var d = n.indexOf(b, a.toLowerCase()),
            f = n.indexOf(b, c.toLowerCase());return d - f;
      });d = [].concat(f, e);f = {};for (h = 0; h < d.length; h++) {
        f[d[h]] = c[d[h]];
      }a.attributes.style = CKEDITOR.tools.writeCssText(f);
    }, pushStylesLower: function pushStylesLower(a, b, c) {
      if (!a.attributes.style || 0 === a.children.length) return !1;b = b || {};var d = { "list-style-type": !0, width: !0, height: !0, border: !0, "border-": !0 },
          f = n.parseCssText(a.attributes.style),
          e;for (e in f) {
        if (!(e.toLowerCase() in d || d[e.toLowerCase().replace(/\-.*$/, "-")] || e.toLowerCase() in b)) {
          for (var h = !1, l = 0; l < a.children.length; l++) {
            var g = a.children[l];if (g.type === CKEDITOR.NODE_TEXT && c) {
              var m = new CKEDITOR.htmlParser.element("span");m.setHtml(g.value);g.replaceWith(m);g = m;
            }g.type === CKEDITOR.NODE_ELEMENT && (h = !0, k.setStyle(g, e, f[e]));
          }h && delete f[e];
        }
      }a.attributes.style = CKEDITOR.tools.writeCssText(f);return !0;
    }, inliner: { filtered: "break-before break-after break-inside page-break page-break-before page-break-after page-break-inside".split(" "), parse: function parse(a) {
        function b(a) {
          var b = new CKEDITOR.dom.element("style"),
              c = new CKEDITOR.dom.element("iframe");c.hide();CKEDITOR.document.getBody().append(c);
          c.$.contentDocument.documentElement.appendChild(b.$);b.$.textContent = a;c.remove();return b.$.sheet;
        }function c(a) {
          var b = a.indexOf("{"),
              c = a.indexOf("}");return d(a.substring(b + 1, c), !0);
        }var d = CKEDITOR.tools.parseCssText,
            f = CKEDITOR.plugins.pastefromword.styles.inliner.filter,
            e = a.is ? a.$.sheet : b(a);a = [];var h;if (e) for (e = e.cssRules, h = 0; h < e.length; h++) {
          e[h].type === window.CSSRule.STYLE_RULE && a.push({ selector: e[h].selectorText, styles: f(c(e[h].cssText)) });
        }return a;
      }, filter: function filter(a) {
        var b = CKEDITOR.plugins.pastefromword.styles.inliner.filtered,
            c = n.array.indexOf,
            d = {},
            f;for (f in a) {
          -1 === c(b, f) && (d[f] = a[f]);
        }return d;
      }, sort: function sort(a) {
        return a.sort(function (a) {
          var c = CKEDITOR.tools.array.map(a, function (a) {
            return a.selector;
          });return function (a, b) {
            var e = -1 !== ("" + a.selector).indexOf(".") ? 1 : 0,
                e = (-1 !== ("" + b.selector).indexOf(".") ? 1 : 0) - e;return 0 !== e ? e : c.indexOf(b.selector) - c.indexOf(a.selector);
          };
        }(a));
      }, inline: function inline(a) {
        var b = CKEDITOR.plugins.pastefromword.styles.inliner.parse,
            c = CKEDITOR.plugins.pastefromword.styles.inliner.sort,
            d = function (a) {
          a = new DOMParser().parseFromString(a, "text/html");return new CKEDITOR.dom.document(a);
        }(a);a = d.find("style");c = c(function (a) {
          var c = [],
              d;for (d = 0; d < a.count(); d++) {
            c = c.concat(b(a.getItem(d)));
          }return c;
        }(a));CKEDITOR.tools.array.forEach(c, function (a) {
          var b = a.styles;a = d.find(a.selector);var c, g, r;for (r = 0; r < a.count(); r++) {
            c = a.getItem(r), g = CKEDITOR.tools.parseCssText(c.getAttribute("style")), g = CKEDITOR.tools.extend({}, g, b), c.setAttribute("style", CKEDITOR.tools.writeCssText(g));
          }
        });return d;
      } } };k = CKEDITOR.plugins.pastefromword.styles;CKEDITOR.plugins.pastefromword.lists = { thisIsAListItem: function thisIsAListItem(a, b) {
      return t.isEdgeListItem(a, b) || b.attributes.style && b.attributes.style.match(/mso\-list:\s?l\d/) && "li" !== b.parent.name || b.attributes["cke-dissolved"] || b.getHtml().match(/<!\-\-\[if !supportLists]\-\->/) ? !0 : !1;
    }, convertToFakeListItem: function convertToFakeListItem(a, b) {
      t.isDegenerateListItem(a, b) && t.assignListLevels(a, b);this.getListItemInfo(b);if (!b.attributes["cke-dissolved"]) {
        var c;b.forEach(function (a) {
          !c && "img" == a.name && a.attributes["cke-ignored"] && "*" == a.attributes.alt && (c = "·", a.remove());
        }, CKEDITOR.NODE_ELEMENT);b.forEach(function (a) {
          c || a.value.match(/^ /) || (c = a.value);
        }, CKEDITOR.NODE_TEXT);if ("undefined" == typeof c) return;b.attributes["cke-symbol"] = c.replace(/(?: |&nbsp;).*$/, "");g.removeSymbolText(b);
      }if (b.attributes.style) {
        var d = n.parseCssText(b.attributes.style);d["margin-left"] && (delete d["margin-left"], b.attributes.style = CKEDITOR.tools.writeCssText(d));
      }b.name = "cke:li";
    }, convertToRealListItems: function convertToRealListItems(a) {
      var b = [];a.forEach(function (a) {
        "cke:li" == a.name && (a.name = "li", b.push(a));
      }, CKEDITOR.NODE_ELEMENT, !1);return b;
    }, removeSymbolText: function removeSymbolText(a) {
      var b,
          c = a.attributes["cke-symbol"];a.forEach(function (d) {
        !b && d.value.match(c.replace(")", "\\)").replace("(", "")) && (d.value = d.value.replace(c, ""), d.parent.getHtml().match(/^(\s|&nbsp;)*$/) && (b = d.parent !== a ? d.parent : null));
      }, CKEDITOR.NODE_TEXT);b && b.remove();
    }, setListSymbol: function setListSymbol(a, b, c) {
      c = c || 1;var d = n.parseCssText(a.attributes.style);if ("ol" == a.name) {
        if (a.attributes.type || d["list-style-type"]) return;var f = { "[ivx]": "lower-roman", "[IVX]": "upper-roman", "[a-z]": "lower-alpha",
          "[A-Z]": "upper-alpha", "\\d": "decimal" },
            e;for (e in f) {
          if (g.getSubsectionSymbol(b).match(new RegExp(e))) {
            d["list-style-type"] = f[e];break;
          }
        }a.attributes["cke-list-style-type"] = d["list-style-type"];
      } else f = { "·": "disc", o: "circle", "§": "square" }, !d["list-style-type"] && f[b] && (d["list-style-type"] = f[b]);g.setListSymbol.removeRedundancies(d, c);(a.attributes.style = CKEDITOR.tools.writeCssText(d)) || delete a.attributes.style;
    }, setListStart: function setListStart(a) {
      for (var b = [], c = 0, d = 0; d < a.children.length; d++) {
        b.push(a.children[d].attributes["cke-symbol"] || "");
      }b[0] || c++;switch (a.attributes["cke-list-style-type"]) {case "lower-roman":case "upper-roman":
          a.attributes.start = g.toArabic(g.getSubsectionSymbol(b[c])) - c;break;case "lower-alpha":case "upper-alpha":
          a.attributes.start = g.getSubsectionSymbol(b[c]).replace(/\W/g, "").toLowerCase().charCodeAt(0) - 96 - c;break;case "decimal":
          a.attributes.start = parseInt(g.getSubsectionSymbol(b[c]), 10) - c || 1;}"1" == a.attributes.start && delete a.attributes.start;delete a.attributes["cke-list-style-type"];
    }, numbering: { toNumber: function toNumber(a, b) {
        function c(a) {
          a = a.toUpperCase();for (var b = 1, c = 1; 0 < a.length; c *= 26) {
            b += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(a.charAt(a.length - 1)) * c, a = a.substr(0, a.length - 1);
          }return b;
        }function d(a) {
          var b = [[1E3, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];a = a.toUpperCase();for (var c = b.length, d = 0, g = 0; g < c; ++g) {
            for (var m = b[g], p = m[1].length; a.substr(0, p) == m[1]; a = a.substr(p)) {
              d += m[0];
            }
          }return d;
        }return "decimal" == b ? Number(a) : "upper-roman" == b || "lower-roman" == b ? d(a.toUpperCase()) : "lower-alpha" == b || "upper-alpha" == b ? c(a) : 1;
      }, getStyle: function getStyle(a) {
        a = a.slice(0, 1);var b = { i: "lower-roman", v: "lower-roman", x: "lower-roman", l: "lower-roman", m: "lower-roman", I: "upper-roman", V: "upper-roman", X: "upper-roman", L: "upper-roman", M: "upper-roman" }[a];b || (b = "decimal", a.match(/[a-z]/) && (b = "lower-alpha"), a.match(/[A-Z]/) && (b = "upper-alpha"));return b;
      } }, getSubsectionSymbol: function getSubsectionSymbol(a) {
      return (a.match(/([\da-zA-Z]+).?$/) || ["placeholder", "1"])[1];
    }, setListDir: function setListDir(a) {
      var b = 0,
          c = 0;a.forEach(function (a) {
        "li" == a.name && ("rtl" == (a.attributes.dir || a.attributes.DIR || "").toLowerCase() ? c++ : b++);
      }, CKEDITOR.ELEMENT_NODE);c > b && (a.attributes.dir = "rtl");
    }, createList: function createList(a) {
      return (a.attributes["cke-symbol"].match(/([\da-np-zA-NP-Z]).?/) || [])[1] ? new CKEDITOR.htmlParser.element("ol") : new CKEDITOR.htmlParser.element("ul");
    }, createLists: function createLists(a) {
      var b,
          c,
          d,
          f = g.convertToRealListItems(a);if (0 === f.length) return [];var e = g.groupLists(f);for (a = 0; a < e.length; a++) {
        var h = e[a],
            l = h[0];for (d = 0; d < h.length; d++) {
          if (1 == h[d].attributes["cke-list-level"]) {
            l = h[d];break;
          }
        }var l = [g.createList(l)],
            k = l[0],
            m = [l[0]];k.insertBefore(h[0]);for (d = 0; d < h.length; d++) {
          b = h[d];for (c = b.attributes["cke-list-level"]; c > l.length;) {
            var p = g.createList(b),
                n = k.children;0 < n.length ? n[n.length - 1].add(p) : (n = new CKEDITOR.htmlParser.element("li", { style: "list-style-type:none" }), n.add(p), k.add(n));l.push(p);m.push(p);k = p;c == l.length && g.setListSymbol(p, b.attributes["cke-symbol"], c);
          }for (; c < l.length;) {
            l.pop(), k = l[l.length - 1], c == l.length && g.setListSymbol(k, b.attributes["cke-symbol"], c);
          }b.remove();
          k.add(b);
        }l[0].children.length && (d = l[0].children[0].attributes["cke-symbol"], !d && 1 < l[0].children.length && (d = l[0].children[1].attributes["cke-symbol"]), d && g.setListSymbol(l[0], d));for (d = 0; d < m.length; d++) {
          g.setListStart(m[d]);
        }for (d = 0; d < h.length; d++) {
          this.determineListItemValue(h[d]);
        }
      }return f;
    }, cleanup: function cleanup(a) {
      var b = ["cke-list-level", "cke-symbol", "cke-list-id", "cke-indentation", "cke-dissolved"],
          c,
          d;for (c = 0; c < a.length; c++) {
        for (d = 0; d < b.length; d++) {
          delete a[c].attributes[b[d]];
        }
      }
    }, determineListItemValue: function determineListItemValue(a) {
      if ("ol" === a.parent.name) {
        var b = this.calculateValue(a),
            c = a.attributes["cke-symbol"].match(/[a-z0-9]+/gi),
            d;c && (c = c[c.length - 1], d = a.parent.attributes["cke-list-style-type"] || this.numbering.getStyle(c), c = this.numbering.toNumber(c, d), c !== b && (a.attributes.value = c));
      }
    }, calculateValue: function calculateValue(a) {
      if (!a.parent) return 1;var b = a.parent;a = a.getIndex();var c = null,
          d,
          f,
          e;for (e = a; 0 <= e && null === c; e--) {
        f = b.children[e], f.attributes && void 0 !== f.attributes.value && (d = e, c = parseInt(f.attributes.value, 10));
      }null === c && (c = void 0 !== b.attributes.start ? parseInt(b.attributes.start, 10) : 1, d = 0);return c + (a - d);
    }, dissolveList: function dissolveList(a) {
      function b(a) {
        return 50 <= a ? "l" + b(a - 50) : 40 <= a ? "xl" + b(a - 40) : 10 <= a ? "x" + b(a - 10) : 9 == a ? "ix" : 5 <= a ? "v" + b(a - 5) : 4 == a ? "iv" : 1 <= a ? "i" + b(a - 1) : "";
      }function c(a, b) {
        function c(b, d) {
          return b && b.parent ? a(b.parent) ? c(b.parent, d + 1) : c(b.parent, d) : d;
        }return c(b, 0);
      }var d = function d(a) {
        return function (b) {
          return b.name == a;
        };
      },
          f = function f(a) {
        return d("ul")(a) || d("ol")(a);
      },
          e = CKEDITOR.tools.array,
          g = [],
          l,
          r;a.forEach(function (a) {
        g.push(a);
      }, CKEDITOR.NODE_ELEMENT, !1);l = e.filter(g, d("li"));var m = e.filter(g, f);e.forEach(m, function (a) {
        var g = a.attributes.type,
            h = parseInt(a.attributes.start, 10) || 1,
            m = c(f, a) + 1;g || (g = n.parseCssText(a.attributes.style)["list-style-type"]);e.forEach(e.filter(a.children, d("li")), function (c, d) {
          var e;switch (g) {case "disc":
              e = "·";break;case "circle":
              e = "o";break;case "square":
              e = "§";break;case "1":case "decimal":
              e = h + d + ".";break;case "a":case "lower-alpha":
              e = String.fromCharCode(97 + h - 1 + d) + ".";break;case "A":case "upper-alpha":
              e = String.fromCharCode(65 + h - 1 + d) + ".";break;case "i":case "lower-roman":
              e = b(h + d) + ".";break;case "I":case "upper-roman":
              e = b(h + d).toUpperCase() + ".";break;default:
              e = "ul" == a.name ? "·" : h + d + ".";}c.attributes["cke-symbol"] = e;c.attributes["cke-list-level"] = m;
        });
      });l = e.reduce(l, function (a, b) {
        var c = b.children[0];if (c && c.name && c.attributes.style && c.attributes.style.match(/mso-list:/i)) {
          k.pushStylesLower(b, { "list-style-type": !0, display: !0 });var d = n.parseCssText(c.attributes.style, !0);k.setStyle(b, "mso-list", d["mso-list"], !0);k.setStyle(c, "mso-list", "");delete b["cke-list-level"];(c = d.display ? "display" : d.DISPLAY ? "DISPLAY" : "") && k.setStyle(b, "display", d[c], !0);
        }if (1 === b.children.length && f(b.children[0])) return a;b.name = "p";b.attributes["cke-dissolved"] = !0;a.push(b);return a;
      }, []);for (r = l.length - 1; 0 <= r; r--) {
        l[r].insertAfter(a);
      }for (r = m.length - 1; 0 <= r; r--) {
        delete m[r].name;
      }
    }, groupLists: function groupLists(a) {
      var b,
          c,
          d = [[a[0]]],
          f = d[0];c = a[0];c.attributes["cke-indentation"] = c.attributes["cke-indentation"] || g.getElementIndentation(c);for (b = 1; b < a.length; b++) {
        c = a[b];var e = a[b - 1];c.attributes["cke-indentation"] = c.attributes["cke-indentation"] || g.getElementIndentation(c);c.previous !== e && (g.chopDiscontinuousLists(f, d), d.push(f = []));f.push(c);
      }g.chopDiscontinuousLists(f, d);return d;
    }, chopDiscontinuousLists: function chopDiscontinuousLists(a, b) {
      for (var c = {}, d = [[]], f, e = 0; e < a.length; e++) {
        var h = c[a[e].attributes["cke-list-level"]],
            l = this.getListItemInfo(a[e]),
            k,
            m;h ? (m = h.type.match(/alpha/) && 7 == h.index ? "alpha" : m, m = "o" == a[e].attributes["cke-symbol"] && 14 == h.index ? "alpha" : m, k = g.getSymbolInfo(a[e].attributes["cke-symbol"], m), l = this.getListItemInfo(a[e]), (h.type != k.type || f && l.id != f.id && !this.isAListContinuation(a[e])) && d.push([])) : k = g.getSymbolInfo(a[e].attributes["cke-symbol"]);for (f = parseInt(a[e].attributes["cke-list-level"], 10) + 1; 20 > f; f++) {
          c[f] && delete c[f];
        }c[a[e].attributes["cke-list-level"]] = k;d[d.length - 1].push(a[e]);f = l;
      }[].splice.apply(b, [].concat([n.indexOf(b, a), 1], d));
    }, isAListContinuation: function isAListContinuation(a) {
      var b = a;do {
        if ((b = b.previous) && b.type === CKEDITOR.NODE_ELEMENT) {
          if (void 0 === b.attributes["cke-list-level"]) break;
          if (b.attributes["cke-list-level"] === a.attributes["cke-list-level"]) return b.attributes["cke-list-id"] === a.attributes["cke-list-id"];
        }
      } while (b);return !1;
    }, getElementIndentation: function getElementIndentation(a) {
      a = n.parseCssText(a.attributes.style);if (a.margin || a.MARGIN) {
        a.margin = a.margin || a.MARGIN;var b = { styles: { margin: a.margin } };CKEDITOR.filter.transformationsTools.splitMarginShorthand(b);a["margin-left"] = b.styles["margin-left"];
      }return parseInt(n.convertToPx(a["margin-left"] || "0px"), 10);
    }, toArabic: function toArabic(a) {
      return a.match(/[ivxl]/i) ? a.match(/^l/i) ? 50 + g.toArabic(a.slice(1)) : a.match(/^lx/i) ? 40 + g.toArabic(a.slice(1)) : a.match(/^x/i) ? 10 + g.toArabic(a.slice(1)) : a.match(/^ix/i) ? 9 + g.toArabic(a.slice(2)) : a.match(/^v/i) ? 5 + g.toArabic(a.slice(1)) : a.match(/^iv/i) ? 4 + g.toArabic(a.slice(2)) : a.match(/^i/i) ? 1 + g.toArabic(a.slice(1)) : g.toArabic(a.slice(1)) : 0;
    }, getSymbolInfo: function getSymbolInfo(a, b) {
      var c = a.toUpperCase() == a ? "upper-" : "lower-",
          d = { "·": ["disc", -1], o: ["circle", -2], "§": ["square", -3] };if (a in d || b && b.match(/(disc|circle|square)/)) return { index: d[a][1],
        type: d[a][0] };if (a.match(/\d/)) return { index: a ? parseInt(g.getSubsectionSymbol(a), 10) : 0, type: "decimal" };a = a.replace(/\W/g, "").toLowerCase();return !b && a.match(/[ivxl]+/i) || b && "alpha" != b || "roman" == b ? { index: g.toArabic(a), type: c + "roman" } : a.match(/[a-z]/i) ? { index: a.charCodeAt(0) - 97, type: c + "alpha" } : { index: -1, type: "disc" };
    }, getListItemInfo: function getListItemInfo(a) {
      if (void 0 !== a.attributes["cke-list-id"]) return { id: a.attributes["cke-list-id"], level: a.attributes["cke-list-level"] };var b = n.parseCssText(a.attributes.style)["mso-list"],
          c = { id: "0", level: "1" };b && (b += " ", c.level = b.match(/level(.+?)\s+/)[1], c.id = b.match(/l(\d+?)\s+/)[1]);a.attributes["cke-list-level"] = void 0 !== a.attributes["cke-list-level"] ? a.attributes["cke-list-level"] : c.level;a.attributes["cke-list-id"] = c.id;return c;
    } };g = CKEDITOR.plugins.pastefromword.lists;CKEDITOR.plugins.pastefromword.heuristics = { isEdgeListItem: function isEdgeListItem(a, b) {
      if (!CKEDITOR.env.edge || !a.config.pasteFromWord_heuristicsEdgeList) return !1;var c = "";b.forEach && b.forEach(function (a) {
        c += a.value;
      }, CKEDITOR.NODE_TEXT);
      return c.match(/^(?: |&nbsp;)*\(?[a-zA-Z0-9]+?[\.\)](?: |&nbsp;){2,}/) ? !0 : t.isDegenerateListItem(a, b);
    }, cleanupEdgeListItem: function cleanupEdgeListItem(a) {
      var b = !1;a.forEach(function (a) {
        b || (a.value = a.value.replace(/^(?:&nbsp;|[\s])+/, ""), a.value.length && (b = !0));
      }, CKEDITOR.NODE_TEXT);
    }, isDegenerateListItem: function isDegenerateListItem(a, b) {
      return !!b.attributes["cke-list-level"] || b.attributes.style && !b.attributes.style.match(/mso\-list/) && !!b.find(function (a) {
        if (a.type == CKEDITOR.NODE_ELEMENT && b.name.match(/h\d/i) && a.getHtml().match(/^[a-zA-Z0-9]+?[\.\)]$/)) return !0;
        var d = n.parseCssText(a.attributes && a.attributes.style, !0);if (!d) return !1;var f = d["font-family"] || "";return (d.font || d["font-size"] || "").match(/7pt/i) && !!a.previous || f.match(/symbol/i);
      }, !0).length;
    }, assignListLevels: function assignListLevels(a, b) {
      if (!b.attributes || void 0 === b.attributes["cke-list-level"]) {
        for (var c = [g.getElementIndentation(b)], d = [b], f = [], e = CKEDITOR.tools.array, h = e.map; b.next && b.next.attributes && !b.next.attributes["cke-list-level"] && t.isDegenerateListItem(a, b.next);) {
          b = b.next, c.push(g.getElementIndentation(b)), d.push(b);
        }var k = h(c, function (a, b) {
          return 0 === b ? 0 : a - c[b - 1];
        }),
            n = this.guessIndentationStep(e.filter(c, function (a) {
          return 0 !== a;
        })),
            f = h(c, function (a) {
          return Math.round(a / n);
        });-1 !== e.indexOf(f, 0) && (f = h(f, function (a) {
          return a + 1;
        }));e.forEach(d, function (a, b) {
          a.attributes["cke-list-level"] = f[b];
        });return { indents: c, levels: f, diffs: k };
      }
    }, guessIndentationStep: function guessIndentationStep(a) {
      return a.length ? Math.min.apply(null, a) : null;
    }, correctLevelShift: function correctLevelShift(a) {
      if (this.isShifted(a)) {
        var b = CKEDITOR.tools.array.filter(a.children, function (a) {
          return "ul" == a.name || "ol" == a.name;
        }),
            c = CKEDITOR.tools.array.reduce(b, function (a, b) {
          return (b.children && 1 == b.children.length && t.isShifted(b.children[0]) ? [b] : b.children).concat(a);
        }, []);CKEDITOR.tools.array.forEach(b, function (a) {
          a.remove();
        });CKEDITOR.tools.array.forEach(c, function (b) {
          a.add(b, 0);
        });delete a.name;
      }
    }, isShifted: function isShifted(a) {
      return "li" !== a.name ? !1 : 0 === CKEDITOR.tools.array.filter(a.children, function (a) {
        return a.name && ("ul" == a.name || "ol" == a.name || "p" == a.name && 0 === a.children.length) ? !1 : !0;
      }).length;
    } };t = CKEDITOR.plugins.pastefromword.heuristics;
  g.setListSymbol.removeRedundancies = function (a, b) {
    (1 === b && "disc" === a["list-style-type"] || "decimal" === a["list-style-type"]) && delete a["list-style-type"];
  };CKEDITOR.plugins.pastefromword.createAttributeStack = x;CKEDITOR.config.pasteFromWord_heuristicsEdgeList = !0;
})();
//# sourceMappingURL=default.js.map