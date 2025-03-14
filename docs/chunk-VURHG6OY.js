import{b as oe,c as le,d as z,e as re}from"./chunk-Q4DTPSKR.js";import{L as U,M as Z,Q as ee,R as te,S as ne,T as g,V as ie,Z as ae,_ as F,aa as I,ia as pe,ja as se}from"./chunk-NFQGGXEN.js";import{$a as T,Ab as Q,Bb as M,Bc as W,Db as S,Eb as h,Ec as X,Fb as j,Fc as J,Gb as k,Gc as K,Ib as u,Jc as L,Kb as f,Lb as m,Oa as r,P as y,Pb as v,Q as _,Qb as N,Ta as D,V as x,Vb as w,ab as C,bb as V,ca as b,db as $,eb as d,kc as G,lb as H,mb as p,oa as q,ob as E,qb as Y,wb as s,xb as c,zb as A}from"./chunk-O4TQY3II.js";import"./chunk-NUMHA4AJ.js";var he=["header"],ve=["title"],ye=["subtitle"],_e=["content"],xe=["footer"],Te=["*",[["p-header"]],[["p-footer"]]],Ce=["*","p-header","p-footer"];function $e(e,a){e&1&&M(0)}function Me(e,a){if(e&1&&(s(0,"div",8),k(1,1),d(2,$e,1,0,"ng-container",6),c()),e&2){let t=h();r(2),p("ngTemplateOutlet",t.headerTemplate||t._headerTemplate)}}function Se(e,a){if(e&1&&(A(0),v(1),Q()),e&2){let t=h(2);r(),N(t.header)}}function ke(e,a){e&1&&M(0)}function we(e,a){if(e&1&&(s(0,"div",9),d(1,Se,2,1,"ng-container",10)(2,ke,1,0,"ng-container",6),c()),e&2){let t=h();r(),p("ngIf",t.header&&!t._titleTemplate&&!t.titleTemplate),r(),p("ngTemplateOutlet",t.titleTemplate||t._titleTemplate)}}function Fe(e,a){if(e&1&&(A(0),v(1),Q()),e&2){let t=h(2);r(),N(t.subheader)}}function Ie(e,a){e&1&&M(0)}function De(e,a){if(e&1&&(s(0,"div",11),d(1,Fe,2,1,"ng-container",10)(2,Ie,1,0,"ng-container",6),c()),e&2){let t=h();r(),p("ngIf",t.subheader&&!t._subtitleTemplate&&!t.subtitleTemplate),r(),p("ngTemplateOutlet",t.subtitleTemplate||t._subtitleTemplate)}}function Ee(e,a){e&1&&M(0)}function je(e,a){e&1&&M(0)}function Le(e,a){if(e&1&&(s(0,"div",12),k(1,2),d(2,je,1,0,"ng-container",6),c()),e&2){let t=h();r(2),p("ngTemplateOutlet",t.footerTemplate||t._footerTemplate)}}var ze=({dt:e})=>`
.p-card {
    background: ${e("card.background")};
    color: ${e("card.color")};
    box-shadow: ${e("card.shadow")};
    border-radius: ${e("card.border.radius")};
    display: flex;
    flex-direction: column;
}

.p-card-caption {
    display: flex;
    flex-direction: column;
    gap: ${e("card.caption.gap")};
}

.p-card-body {
    padding: ${e("card.body.padding")};
    display: flex;
    flex-direction: column;
    gap: ${e("card.body.gap")};
}

.p-card-title {
    font-size: ${e("card.title.font.size")};
    font-weight: ${e("card.title.font.weight")};
}

.p-card-subtitle {
    color: ${e("card.subtitle.color")};
}
`,Be={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},ce=(()=>{class e extends F{name="card";theme=ze;classes=Be;static \u0275fac=(()=>{let t;return function(n){return(t||(t=b(e)))(n||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var R=(()=>{class e extends I{header;subheader;set style(t){Z(this._style(),t)||this._style.set(t)}styleClass;headerFacet;footerFacet;headerTemplate;titleTemplate;subtitleTemplate;contentTemplate;footerTemplate;_headerTemplate;_titleTemplate;_subtitleTemplate;_contentTemplate;_footerTemplate;_style=q(null);_componentStyle=x(ce);getBlockableElement(){return this.el.nativeElement.children[0]}templates;ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"header":this._headerTemplate=t.template;break;case"title":this._titleTemplate=t.template;break;case"subtitle":this._subtitleTemplate=t.template;break;case"content":this._contentTemplate=t.template;break;case"footer":this._footerTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=b(e)))(n||e)}})();static \u0275cmp=T({type:e,selectors:[["p-card"]],contentQueries:function(i,n,l){if(i&1&&(u(l,ee,5),u(l,te,5),u(l,he,4),u(l,ve,4),u(l,ye,4),u(l,_e,4),u(l,xe,4),u(l,ne,4)),i&2){let o;f(o=m())&&(n.headerFacet=o.first),f(o=m())&&(n.footerFacet=o.first),f(o=m())&&(n.headerTemplate=o.first),f(o=m())&&(n.titleTemplate=o.first),f(o=m())&&(n.subtitleTemplate=o.first),f(o=m())&&(n.contentTemplate=o.first),f(o=m())&&(n.footerTemplate=o.first),f(o=m())&&(n.templates=o)}},inputs:{header:"header",subheader:"subheader",style:"style",styleClass:"styleClass"},features:[w([ce]),$],ngContentSelectors:Ce,decls:9,vars:10,consts:[[3,"ngClass","ngStyle"],["class","p-card-header",4,"ngIf"],[1,"p-card-body"],["class","p-card-title",4,"ngIf"],["class","p-card-subtitle",4,"ngIf"],[1,"p-card-content"],[4,"ngTemplateOutlet"],["class","p-card-footer",4,"ngIf"],[1,"p-card-header"],[1,"p-card-title"],[4,"ngIf"],[1,"p-card-subtitle"],[1,"p-card-footer"]],template:function(i,n){i&1&&(j(Te),s(0,"div",0),d(1,Me,3,1,"div",1),s(2,"div",2),d(3,we,3,2,"div",3)(4,De,3,2,"div",4),s(5,"div",5),k(6),d(7,Ee,1,0,"ng-container",6),c(),d(8,Le,3,1,"div",7),c()()),i&2&&(Y(n.styleClass),p("ngClass","p-card p-component")("ngStyle",n._style()),H("data-pc-name","card"),r(),p("ngIf",n.headerFacet||n.headerTemplate||n._headerTemplate),r(2),p("ngIf",n.header||n.titleTemplate||n._titleTemplate),r(),p("ngIf",n.subheader||n.subtitleTemplate||n._subtitleTemplate),r(3),p("ngTemplateOutlet",n.contentTemplate||n._contentTemplate),r(),p("ngIf",n.footerFacet||n.footerTemplate||n._footerTemplate))},dependencies:[L,W,X,K,J,g],encapsulation:2,changeDetection:0})}return e})(),de=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=C({type:e});static \u0275inj=_({imports:[R,g,g]})}return e})();var Ne=({dt:e})=>`
.p-inputtext {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: ${e("inputtext.color")};
    background: ${e("inputtext.background")};
    padding-block: ${e("inputtext.padding.y")};
    padding-inline: ${e("inputtext.padding.x")};
    border: 1px solid ${e("inputtext.border.color")};
    transition: background ${e("inputtext.transition.duration")}, color ${e("inputtext.transition.duration")}, border-color ${e("inputtext.transition.duration")}, outline-color ${e("inputtext.transition.duration")}, box-shadow ${e("inputtext.transition.duration")};
    appearance: none;
    border-radius: ${e("inputtext.border.radius")};
    outline-color: transparent;
    box-shadow: ${e("inputtext.shadow")};
}

.p-inputtext.ng-invalid.ng-dirty {
    border-color: ${e("inputtext.invalid.border.color")};
}

.p-inputtext:enabled:hover {
    border-color: ${e("inputtext.hover.border.color")};
}

.p-inputtext:enabled:focus {
    border-color: ${e("inputtext.focus.border.color")};
    box-shadow: ${e("inputtext.focus.ring.shadow")};
    outline: ${e("inputtext.focus.ring.width")} ${e("inputtext.focus.ring.style")} ${e("inputtext.focus.ring.color")};
    outline-offset: ${e("inputtext.focus.ring.offset")};
}

.p-inputtext.p-invalid {
    border-color: ${e("inputtext.invalid.border.color")};
}

.p-inputtext.p-variant-filled {
    background: ${e("inputtext.filled.background")};
}
    
.p-inputtext.p-variant-filled:enabled:hover {
    background: ${e("inputtext.filled.hover.background")};
}

.p-inputtext.p-variant-filled:enabled:focus {
    background: ${e("inputtext.filled.focus.background")};
}

.p-inputtext:disabled {
    opacity: 1;
    background: ${e("inputtext.disabled.background")};
    color: ${e("inputtext.disabled.color")};
}

.p-inputtext::placeholder {
    color: ${e("inputtext.placeholder.color")};
}

.p-inputtext.ng-invalid.ng-dirty::placeholder {
    color: ${e("inputtext.invalid.placeholder.color")};
}

.p-inputtext-sm {
    font-size: ${e("inputtext.sm.font.size")};
    padding-block: ${e("inputtext.sm.padding.y")};
    padding-inline: ${e("inputtext.sm.padding.x")};
}

.p-inputtext-lg {
    font-size: ${e("inputtext.lg.font.size")};
    padding-block: ${e("inputtext.lg.padding.y")};
    padding-inline: ${e("inputtext.lg.padding.x")};
}

.p-inputtext-fluid {
    width: 100%;
}
`,Pe={root:({instance:e,props:a})=>["p-inputtext p-component",{"p-filled":e.filled,"p-inputtext-sm":a.size==="small","p-inputtext-lg":a.size==="large","p-invalid":a.invalid,"p-variant-filled":a.variant==="filled","p-inputtext-fluid":a.fluid}]},ue=(()=>{class e extends F{name="inputtext";theme=Ne;classes=Pe;static \u0275fac=(()=>{let t;return function(n){return(t||(t=b(e)))(n||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var fe=(()=>{class e extends I{ngModel;variant;fluid;pSize;filled;_componentStyle=x(ue);get hasFluid(){let i=this.el.nativeElement.closest("p-fluid");return U(this.fluid)?!!i:this.fluid}constructor(t){super(),this.ngModel=t}ngAfterViewInit(){super.ngAfterViewInit(),this.updateFilledState(),this.cd.detectChanges()}ngDoCheck(){this.updateFilledState()}onInput(){this.updateFilledState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length||this.ngModel&&this.ngModel.model}static \u0275fac=function(i){return new(i||e)(D(z,8))};static \u0275dir=V({type:e,selectors:[["","pInputText",""]],hostAttrs:[1,"p-inputtext","p-component"],hostVars:14,hostBindings:function(i,n){if(i&1&&S("input",function(o){return n.onInput(o)}),i&2){let l;E("p-filled",n.filled)("p-variant-filled",((l=n.variant)!==null&&l!==void 0?l:n.config.inputStyle()||n.config.inputVariant())==="filled")("p-inputtext-fluid",n.hasFluid)("p-inputtext-sm",n.pSize==="small")("p-inputfield-sm",n.pSize==="small")("p-inputtext-lg",n.pSize==="large")("p-inputfield-lg",n.pSize==="large")}},inputs:{variant:"variant",fluid:[2,"fluid","fluid",G],pSize:"pSize"},features:[w([ue]),$]})}return e})(),me=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=C({type:e});static \u0275inj=_({})}return e})();var Oe=["*"],qe=({dt:e})=>`
.p-floatlabel {
    display: block;
    position: relative;
}

.p-floatlabel label {
    position: absolute;
    pointer-events: none;
    top: 50%;
    transform: translateY(-50%);
    transition-property: all;
    transition-timing-function: ease;
    line-height: 1;
    font-weight: ${e("floatlabel.font.weight")};
    inset-inline-start: ${e("floatlabel.position.x")};
    color: ${e("floatlabel.color")};
    transition-duration: ${e("floatlabel.transition.duration")};
}

.p-floatlabel:has(.p-textarea) label {
    top: ${e("floatlabel.position.y")};
    transform: translateY(0);
}

.p-floatlabel:has(.p-inputicon:first-child) label {
    inset-inline-start: calc((${e("form.field.padding.x")} * 2) + ${e("icon.size")});
}

.p-floatlabel:has(.ng-invalid.ng-dirty) label {
    color: ${e("floatlabel.invalid.color")};
}

.p-floatlabel:has(input:focus) label,
.p-floatlabel:has(input.p-filled) label,
.p-floatlabel:has(input:-webkit-autofill) label,
.p-floatlabel:has(textarea:focus) label,
.p-floatlabel:has(textarea.p-filled) label,
.p-floatlabel:has(.p-inputwrapper-focus) label,
.p-floatlabel:has(.p-inputwrapper-filled) label {
    top: ${e("floatlabel.over.active.top")};
    transform: translateY(0);
    font-size: ${e("floatlabel.active.font.size")};
    font-weight: ${e("floatlabel.label.active.font.weight")};
}

.p-floatlabel:has(input.p-filled) label,
.p-floatlabel:has(textarea.p-filled) label,
.p-floatlabel:has(.p-inputwrapper-filled) label {
    color: ${e("floatlabel.active.color")};
}

.p-floatlabel:has(input:focus) label,
.p-floatlabel:has(input:-webkit-autofill) label,
.p-floatlabel:has(textarea:focus) label,
.p-floatlabel:has(.p-inputwrapper-focus) label {
    color: ${e("floatlabel.focus.color")};
}

.p-floatlabel-in .p-inputtext,
.p-floatlabel-in .p-textarea,
.p-floatlabel-in .p-select-label,
.p-floatlabel-in .p-multiselect-label-container,
.p-floatlabel-in .p-autocomplete-input-multiple,
.p-floatlabel-in .p-cascadeselect-label,
.p-floatlabel-in .p-treeselect-label {
    padding-top: ${e("floatlabel.in.input.padding.top")};
}

.p-floatlabel-in:has(input:focus) label,
.p-floatlabel-in:has(input.p-filled) label,
.p-floatlabel-in:has(input:-webkit-autofill) label,
.p-floatlabel-in:has(textarea:focus) label,
.p-floatlabel-in:has(textarea.p-filled) label,
.p-floatlabel-in:has(.p-inputwrapper-focus) label,
.p-floatlabel-in:has(.p-inputwrapper-filled) label {
    top: ${e("floatlabel.in.active.top")};
}

.p-floatlabel-on:has(input:focus) label,
.p-floatlabel-on:has(input.p-filled) label,
.p-floatlabel-on:has(input:-webkit-autofill) label,
.p-floatlabel-on:has(textarea:focus) label,
.p-floatlabel-on:has(textarea.p-filled) label,
.p-floatlabel-on:has(.p-inputwrapper-focus) label,
.p-floatlabel-on:has(.p-inputwrapper-filled) label {
    top: 0;
    transform: translateY(-50%);
    border-radius: ${e("floatlabel.on.border.radius")};
    background: ${e("floatlabel.on.active.background")};
    padding: ${e("floatlabel.on.active.padding")};
}
`,Ve={root:({instance:e,props:a})=>["p-floatlabel",{"p-floatlabel-over":a.variant==="over","p-floatlabel-on":a.variant==="on","p-floatlabel-in":a.variant==="in"}]},be=(()=>{class e extends F{name="floatlabel";theme=qe;classes=Ve;static \u0275fac=(()=>{let t;return function(n){return(t||(t=b(e)))(n||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var O=(()=>{class e extends I{_componentStyle=x(be);variant="over";static \u0275fac=(()=>{let t;return function(n){return(t||(t=b(e)))(n||e)}})();static \u0275cmp=T({type:e,selectors:[["p-floatlabel"],["p-floatLabel"],["p-float-label"]],hostVars:8,hostBindings:function(i,n){i&2&&E("p-floatlabel",!0)("p-floatlabel-over",n.variant==="over")("p-floatlabel-on",n.variant==="on")("p-floatlabel-in",n.variant==="in")},inputs:{variant:"variant"},features:[w([be]),$],ngContentSelectors:Oe,decls:1,vars:0,template:function(i,n){i&1&&(j(),k(0))},dependencies:[L,g],encapsulation:2,changeDetection:0})}return e})(),ge=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=C({type:e});static \u0275inj=_({imports:[O,g,g]})}return e})();var B=class e{constructor(a,t){this.authService=a;this.messageService=t}credentials={identifier:"",password:""};APP_PASSWORD_REGEX=new RegExp("[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}");onLogin(){this.credentials.identifier=this.credentials.identifier.trim(),this.credentials.identifier.length&&this.APP_PASSWORD_REGEX.exec(this.credentials.password)?this.authService.login(this.credentials):this.messageService.warnIcon("Please check your credentials.","Oops!")}static \u0275fac=function(t){return new(t||e)(D(ae),D(ie))};static \u0275cmp=T({type:e,selectors:[["app-login"]],decls:13,vars:2,consts:[[1,"flex","h-full","items-center","justify-center"],["header","Login"],[1,"flex","flex-col","mt-8"],["pInputText","","name","handle",3,"ngModelChange","keyup.enter","ngModel"],[1,"mt-8"],["pInputText","","name","password",3,"ngModelChange","keyup.enter","ngModel"],[1,"mt-6",3,"onClick"]],template:function(t,i){t&1&&(s(0,"div",0)(1,"p-card",1)(2,"p",2)(3,"p-floatlabel")(4,"input",3),S("ngModelChange",function(l){return i.credentials.identifier=l})("keyup.enter",function(){return i.onLogin()}),c(),s(5,"label"),v(6,"Handle"),c()(),s(7,"p-floatlabel",4)(8,"input",5),S("ngModelChange",function(l){return i.credentials.password=l})("keyup.enter",function(){return i.onLogin()}),c(),s(9,"label"),v(10,"App Password"),c()(),s(11,"p-button",6),S("onClick",function(){return i.onLogin()}),v(12," Login "),c()()()()),t&2&&(r(4),p("ngModel",i.credentials.identifier),r(4),p("ngModel",i.credentials.password))},dependencies:[re,oe,le,z,de,R,me,fe,ge,O,se,pe],encapsulation:2})};var Nt=[{path:"",component:B}];export{Nt as routes};
