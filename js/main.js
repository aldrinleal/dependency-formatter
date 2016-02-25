///<reference path="../typings/browser.d.ts"/>
var Dependency = (function () {
    function Dependency(groupId, artifactId, packaging, classifier, version, scope) {
        this.groupId = groupId;
        this.artifactId = artifactId;
        this.packaging = packaging;
        this.classifier = classifier;
        this.version = version;
        if (scope) {
            this.scope = scope;
        }
        else {
            this.scope = 'compile';
        }
    }
    Dependency.prototype.asDependency = function () {
        var result = "<dependency>\n  <groupId>" + this.groupId + "</groupId>\n  <artifactId>" + this.artifactId + "</artifactId>\n";
        if ('' !== this.classifier) {
            result += "  <classifier>" + this.classifier + "</classifier>\n";
        }
        if ('jar' != this.packaging) {
            result += "  <packaging>" + this.packaging + "</packaging>\n";
        }
        result += "  <version>" + this.version + "</version>\n";
        if ('compile' !== this.scope) {
            result += "  <scope>" + this.scope + "</scope>\n";
        }
        result += '</dependency>';
        return result;
    };
    return Dependency;
}());
$(function () {
    $('#do').on('click', function (e) {
        e.preventDefault();
        var t = $("#text").val();
        var dependencies = t.match(/[^\s]+:[^\s]+:[^\s]+:[^\s]+:([^\s]+(:[^\s]+)?)?/g).map(function (x) {
            //console.log('x: ', x);
            var elts = x.split(/:/);
            if (5 == elts.length) {
                elts.splice(3, 0, '');
            }
            var d = new Dependency();
            d.constructor.apply(d, elts);
            return d;
        }).map(function (d) { return d.asDependency(); });
        console.log('dependencies: ', JSON.stringify(dependencies, null, 2));
        var htmlContent = dependencies.join("\n");
        $("#result").append("<pre>");
        $("#result pre").text(htmlContent);
        //.text(htmlContent);
    });
});
