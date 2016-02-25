///<reference path="../typings/browser.d.ts"/>

class Dependency {
    groupId:string;

    artifactId:string;

    packaging:string;

    classifier: string;

    version:string;

    scope:string;

    constructor(groupId?:string, artifactId?:string, packaging?:string, classifier?: string, version?:string, scope?:string) {
        this.groupId = groupId;
        this.artifactId = artifactId;
        this.packaging = packaging;
        this.classifier = classifier;
        this.version = version;

        if (scope) {
            this.scope = scope;
        } else {
            this.scope = 'compile';
        }
    }

    asDependency():string {
        var result = `<dependency>
  <groupId>${this.groupId}</groupId>
  <artifactId>${this.artifactId}</artifactId>
`

        if ('' !== this.classifier) {
            result += `  <classifier>${this.classifier}</classifier>
`
        }

        if ('jar' != this.packaging) {
            result += `  <packaging>${this.packaging}</packaging>
`
        }

        result += `  <version>${this.version}</version>
`

        if ('compile' !== this.scope) {
            result += `  <scope>${this.scope}</scope>
`
        }

        result += '</dependency>';
        return result;
    }
}

$(function () {
    $('#do').on('click',  (e: JQueryEventObject) => {
        e.preventDefault();

        var t = $("#text").val();

        var dependencies = t.match(/[^\s]+:[^\s]+:[^\s]+:[^\s]+:([^\s]+(:[^\s]+)?)?/g).map((x:string) => {
            //console.log('x: ', x);

            var elts = x.split(/:/);

            if (5 == elts.length) {
                elts.splice(3, 0, '');
            }

            var d = new Dependency();

            d.constructor.apply(d, elts);

            return d;
        }).map((d) => d.asDependency());

        console.log('dependencies: ', JSON.stringify(dependencies, null, 2));

        var htmlContent = dependencies.join("\n");

        $("#result").append("<pre>")
        $("#result pre").text(htmlContent);
        //.text(htmlContent);
    })
});