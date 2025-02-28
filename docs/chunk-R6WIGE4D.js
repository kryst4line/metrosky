import{b as pe,c as se,d as z,e as de}from"./chunk-KJHQNTWL.js";import{L as Z,M as ee,Q as te,R as ne,S as ie,T as b,V as ae,W as oe,X as w,Z as k,fa as le,ga as re}from"./chunk-2ONUABJ3.js";import{$a as C,Ab as $,Ac as K,Bb as h,Bc as U,Cb as L,Db as F,Ec as j,Fb as u,Hb as f,Ib as m,Kb as v,Lb as Q,Na as r,P as y,Q as _,Qb as I,Sa as D,V as x,Xa as T,Ya as M,Za as V,ab as H,bb as c,ca as g,fc as G,ib as J,jb as p,lb as E,nb as Y,oa as q,tb as s,ub as d,wb as A,wc as W,xb as N,yb as S,zc as X}from"./chunk-MIATY5DB.js";import"./chunk-NUMHA4AJ.js";var ye=({dt:e})=>`
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
`,_e={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},ce=(()=>{class e extends w{name="card";theme=ye;classes=_e;static \u0275fac=(()=>{let t;return function(n){return(t||(t=g(e)))(n||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var xe=["header"],Te=["title"],Me=["subtitle"],Ce=["content"],Se=["footer"],$e=["*",[["p-header"]],[["p-footer"]]],Fe=["*","p-header","p-footer"];function Ie(e,a){e&1&&S(0)}function we(e,a){if(e&1&&(s(0,"div",8),F(1,1),c(2,Ie,1,0,"ng-container",6),d()),e&2){let t=h();r(2),p("ngTemplateOutlet",t.headerTemplate||t._headerTemplate)}}function ke(e,a){if(e&1&&(A(0),v(1),N()),e&2){let t=h(2);r(),Q(t.header)}}function De(e,a){e&1&&S(0)}function Ee(e,a){if(e&1&&(s(0,"div",9),c(1,ke,2,1,"ng-container",10)(2,De,1,0,"ng-container",6),d()),e&2){let t=h();r(),p("ngIf",t.header&&!t._titleTemplate&&!t.titleTemplate),r(),p("ngTemplateOutlet",t.titleTemplate||t._titleTemplate)}}function Le(e,a){if(e&1&&(A(0),v(1),N()),e&2){let t=h(2);r(),Q(t.subheader)}}function je(e,a){e&1&&S(0)}function ze(e,a){if(e&1&&(s(0,"div",11),c(1,Le,2,1,"ng-container",10)(2,je,1,0,"ng-container",6),d()),e&2){let t=h();r(),p("ngIf",t.subheader&&!t._subtitleTemplate&&!t.subtitleTemplate),r(),p("ngTemplateOutlet",t.subtitleTemplate||t._subtitleTemplate)}}function Be(e,a){e&1&&S(0)}function Ae(e,a){e&1&&S(0)}function Ne(e,a){if(e&1&&(s(0,"div",12),F(1,2),c(2,Ae,1,0,"ng-container",6),d()),e&2){let t=h();r(2),p("ngTemplateOutlet",t.footerTemplate||t._footerTemplate)}}var R=(()=>{class e extends k{header;subheader;set style(t){ee(this._style(),t)||this._style.set(t)}styleClass;headerFacet;footerFacet;headerTemplate;titleTemplate;subtitleTemplate;contentTemplate;footerTemplate;_headerTemplate;_titleTemplate;_subtitleTemplate;_contentTemplate;_footerTemplate;_style=q(null);_componentStyle=x(ce);getBlockableElement(){return this.el.nativeElement.children[0]}templates;ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"header":this._headerTemplate=t.template;break;case"title":this._titleTemplate=t.template;break;case"subtitle":this._subtitleTemplate=t.template;break;case"content":this._contentTemplate=t.template;break;case"footer":this._footerTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=g(e)))(n||e)}})();static \u0275cmp=T({type:e,selectors:[["p-card"]],contentQueries:function(i,n,l){if(i&1&&(u(l,te,5),u(l,ne,5),u(l,xe,4),u(l,Te,4),u(l,Me,4),u(l,Ce,4),u(l,Se,4),u(l,ie,4)),i&2){let o;f(o=m())&&(n.headerFacet=o.first),f(o=m())&&(n.footerFacet=o.first),f(o=m())&&(n.headerTemplate=o.first),f(o=m())&&(n.titleTemplate=o.first),f(o=m())&&(n.subtitleTemplate=o.first),f(o=m())&&(n.contentTemplate=o.first),f(o=m())&&(n.footerTemplate=o.first),f(o=m())&&(n.templates=o)}},inputs:{header:"header",subheader:"subheader",style:"style",styleClass:"styleClass"},features:[I([ce]),C],ngContentSelectors:Fe,decls:9,vars:10,consts:[[3,"ngClass","ngStyle"],["class","p-card-header",4,"ngIf"],[1,"p-card-body"],["class","p-card-title",4,"ngIf"],["class","p-card-subtitle",4,"ngIf"],[1,"p-card-content"],[4,"ngTemplateOutlet"],["class","p-card-footer",4,"ngIf"],[1,"p-card-header"],[1,"p-card-title"],[4,"ngIf"],[1,"p-card-subtitle"],[1,"p-card-footer"]],template:function(i,n){i&1&&(L($e),s(0,"div",0),c(1,we,3,1,"div",1),s(2,"div",2),c(3,Ee,3,2,"div",3)(4,ze,3,2,"div",4),s(5,"div",5),F(6),c(7,Be,1,0,"ng-container",6),d(),c(8,Ne,3,1,"div",7),d()()),i&2&&(Y(n.styleClass),p("ngClass","p-card p-component")("ngStyle",n._style()),J("data-pc-name","card"),r(),p("ngIf",n.headerFacet||n.headerTemplate||n._headerTemplate),r(2),p("ngIf",n.header||n.titleTemplate||n._titleTemplate),r(),p("ngIf",n.subheader||n.subtitleTemplate||n._subtitleTemplate),r(3),p("ngTemplateOutlet",n.contentTemplate||n._contentTemplate),r(),p("ngIf",n.footerFacet||n.footerTemplate||n._footerTemplate))},dependencies:[j,W,X,U,K,b],encapsulation:2,changeDetection:0})}return e})(),fe=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=M({type:e});static \u0275inj=_({imports:[R,b,b]})}return e})();var Re=({dt:e})=>`
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
`,Oe={root:({instance:e,props:a})=>["p-inputtext p-component",{"p-filled":e.filled,"p-inputtext-sm":a.size==="small","p-inputtext-lg":a.size==="large","p-invalid":a.invalid,"p-variant-filled":a.variant==="filled","p-inputtext-fluid":a.fluid}]},me=(()=>{class e extends w{name="inputtext";theme=Re;classes=Oe;static \u0275fac=(()=>{let t;return function(n){return(t||(t=g(e)))(n||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var ge=(()=>{class e extends k{ngModel;variant;fluid;pSize;filled;_componentStyle=x(me);get hasFluid(){let i=this.el.nativeElement.closest("p-fluid");return Z(this.fluid)?!!i:this.fluid}constructor(t){super(),this.ngModel=t}ngAfterViewInit(){super.ngAfterViewInit(),this.updateFilledState(),this.cd.detectChanges()}ngDoCheck(){this.updateFilledState()}onInput(){this.updateFilledState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length||this.ngModel&&this.ngModel.model}static \u0275fac=function(i){return new(i||e)(D(z,8))};static \u0275dir=V({type:e,selectors:[["","pInputText",""]],hostAttrs:[1,"p-inputtext","p-component"],hostVars:14,hostBindings:function(i,n){if(i&1&&$("input",function(o){return n.onInput(o)}),i&2){let l;E("p-filled",n.filled)("p-variant-filled",((l=n.variant)!==null&&l!==void 0?l:n.config.inputStyle()||n.config.inputVariant())==="filled")("p-inputtext-fluid",n.hasFluid)("p-inputtext-sm",n.pSize==="small")("p-inputfield-sm",n.pSize==="small")("p-inputtext-lg",n.pSize==="large")("p-inputfield-lg",n.pSize==="large")}},inputs:{variant:"variant",fluid:[2,"fluid","fluid",G],pSize:"pSize"},features:[I([me]),H,C]})}return e})(),be=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=M({type:e});static \u0275inj=_({})}return e})();var Ve=({dt:e})=>`
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
`,He={root:({instance:e,props:a})=>["p-floatlabel",{"p-floatlabel-over":a.variant==="over","p-floatlabel-on":a.variant==="on","p-floatlabel-in":a.variant==="in"}]},he=(()=>{class e extends w{name="floatlabel";theme=Ve;classes=He;static \u0275fac=(()=>{let t;return function(n){return(t||(t=g(e)))(n||e)}})();static \u0275prov=y({token:e,factory:e.\u0275fac})}return e})();var Je=["*"],O=(()=>{class e extends k{_componentStyle=x(he);variant="over";static \u0275fac=(()=>{let t;return function(n){return(t||(t=g(e)))(n||e)}})();static \u0275cmp=T({type:e,selectors:[["p-floatlabel"],["p-floatLabel"],["p-float-label"]],hostVars:8,hostBindings:function(i,n){i&2&&E("p-floatlabel",!0)("p-floatlabel-over",n.variant==="over")("p-floatlabel-on",n.variant==="on")("p-floatlabel-in",n.variant==="in")},inputs:{variant:"variant"},features:[I([he]),C],ngContentSelectors:Je,decls:1,vars:0,template:function(i,n){i&1&&(L(),F(0))},dependencies:[j,b],encapsulation:2,changeDetection:0})}return e})(),ve=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=M({type:e});static \u0275inj=_({imports:[O,b,b]})}return e})();var B=class e{constructor(a,t){this.authService=a;this.messageService=t}credentials={identifier:"",password:""};APP_PASSWORD_REGEX=new RegExp("[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}");onLogin(){this.credentials.identifier=this.credentials.identifier.trim(),this.credentials.identifier.length&&this.APP_PASSWORD_REGEX.exec(this.credentials.password)?this.authService.login(this.credentials):this.messageService.warnIcon("Please check your credentials.","Oops!")}static \u0275fac=function(t){return new(t||e)(D(oe),D(ae))};static \u0275cmp=T({type:e,selectors:[["app-login"]],decls:13,vars:2,consts:[[1,"flex","h-full","items-center","justify-center"],["header","Login"],[1,"flex","flex-col","mt-8"],["pInputText","","name","handle",3,"ngModelChange","keyup.enter","ngModel"],[1,"mt-8"],["pInputText","","name","password",3,"ngModelChange","keyup.enter","ngModel"],[1,"mt-6",3,"onClick"]],template:function(t,i){t&1&&(s(0,"div",0)(1,"p-card",1)(2,"p",2)(3,"p-floatlabel")(4,"input",3),$("ngModelChange",function(l){return i.credentials.identifier=l})("keyup.enter",function(){return i.onLogin()}),d(),s(5,"label"),v(6,"Handle"),d()(),s(7,"p-floatlabel",4)(8,"input",5),$("ngModelChange",function(l){return i.credentials.password=l})("keyup.enter",function(){return i.onLogin()}),d(),s(9,"label"),v(10,"App Password"),d()(),s(11,"p-button",6),$("onClick",function(){return i.onLogin()}),v(12," Login "),d()()()()),t&2&&(r(4),p("ngModel",i.credentials.identifier),r(4),p("ngModel",i.credentials.password))},dependencies:[de,pe,se,z,fe,R,be,ge,ve,O,re,le],encapsulation:2})};var Rt=[{path:"",component:B}];export{Rt as routes};
