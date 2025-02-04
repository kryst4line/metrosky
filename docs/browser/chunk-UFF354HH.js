import{a as j}from"./chunk-UMEENJI3.js";import{a as $,b as A,c as E,k as N,l as V,n as H,o as P,p as w,q as J}from"./chunk-B7WRZZMB.js";import{M as B,V as M,_ as y}from"./chunk-ON2BWSIJ.js";import{$a as k,Ab as L,Bb as T,Ib as v,Lb as x,Ma as S,Na as c,P as u,Q as f,V as d,Wa as b,Xa as m,Ya as D,_a as g,_b as z,ca as p,ib as I,kb as h,rb as o,sb as a,xc as _,yb as r}from"./chunk-LA6H3AME.js";import"./chunk-NUMHA4AJ.js";var X=({dt:e})=>`
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
`,Z={root:({instance:e,props:n})=>["p-inputtext p-component",{"p-filled":e.filled,"p-inputtext-sm":n.size==="small","p-inputtext-lg":n.size==="large","p-invalid":n.invalid,"p-variant-filled":n.variant==="filled","p-inputtext-fluid":n.fluid}]},Y=(()=>{class e extends y{name="inputtext";theme=X;classes=Z;static \u0275fac=(()=>{let i;return function(t){return(i||(i=p(e)))(t||e)}})();static \u0275prov=u({token:e,factory:e.\u0275fac})}return e})();var R=(()=>{class e extends ${ngModel;variant="outlined";fluid;pSize;filled;_componentStyle=d(Y);get hasFluid(){let l=this.el.nativeElement.closest("p-fluid");return B(this.fluid)?!!l:this.fluid}constructor(i){super(),this.ngModel=i}ngAfterViewInit(){super.ngAfterViewInit(),this.updateFilledState(),this.cd.detectChanges()}ngDoCheck(){this.updateFilledState()}onInput(){this.updateFilledState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length||this.ngModel&&this.ngModel.model}static \u0275fac=function(l){return new(l||e)(c(w,8))};static \u0275dir=D({type:e,selectors:[["","pInputText",""]],hostAttrs:[1,"p-inputtext","p-component"],hostVars:14,hostBindings:function(l,t){l&1&&r("input",function(Q){return t.onInput(Q)}),l&2&&h("p-filled",t.filled)("p-variant-filled",t.variant==="filled"||t.config.inputStyle()==="filled"||t.config.inputVariant()==="filled")("p-inputtext-fluid",t.hasFluid)("p-inputtext-sm",t.pSize==="small")("p-inputfield-sm",t.pSize==="small")("p-inputtext-lg",t.pSize==="large")("p-inputfield-lg",t.pSize==="large")},inputs:{variant:"variant",fluid:[2,"fluid","fluid",z],pSize:"pSize"},features:[x([Y]),k,g]})}return e})(),q=(()=>{class e{static \u0275fac=function(l){return new(l||e)};static \u0275mod=m({type:e});static \u0275inj=f({})}return e})();var te=({dt:e})=>`
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
`,le={root:({instance:e,props:n})=>["p-floatlabel",{"p-floatlabel-over":n.variant==="over","p-floatlabel-on":n.variant==="on","p-floatlabel-in":n.variant==="in"}]},G=(()=>{class e extends y{name="floatlabel";theme=te;classes=le;static \u0275fac=(()=>{let i;return function(t){return(i||(i=p(e)))(t||e)}})();static \u0275prov=u({token:e,factory:e.\u0275fac})}return e})();var ie=["*"],C=(()=>{class e extends ${_componentStyle=d(G);variant="over";static \u0275fac=(()=>{let i;return function(t){return(i||(i=p(e)))(t||e)}})();static \u0275cmp=b({type:e,selectors:[["p-floatlabel"],["p-floatLabel"],["p-float-label"]],hostVars:8,hostBindings:function(l,t){l&2&&h("p-floatlabel",!0)("p-floatlabel-over",t.variant==="over")("p-floatlabel-on",t.variant==="on")("p-floatlabel-in",t.variant==="in")},inputs:{variant:"variant"},features:[x([G]),g],ngContentSelectors:ie,decls:1,vars:0,template:function(l,t){l&1&&(L(),T(0))},dependencies:[_,M],encapsulation:2,changeDetection:0})}return e})(),K=(()=>{class e{static \u0275fac=function(l){return new(l||e)};static \u0275mod=m({type:e});static \u0275inj=f({imports:[C,M,M]})}return e})();var F=class e{constructor(n){this.authService=n}credentials={identifier:"",password:""};onLogin(){this.authService.login(this.credentials)}static \u0275fac=function(i){return new(i||e)(c(j))};static \u0275cmp=b({type:e,selectors:[["app-login"]],decls:13,vars:2,consts:[[1,"flex","h-full","items-center","justify-center"],["header","Login"],[1,"flex","flex-col","mt-8"],["pInputText","",3,"ngModelChange","ngModel"],[1,"mt-8"],["pInputText","","type","password",3,"ngModelChange","ngModel"],[1,"mt-6",3,"onClick"]],template:function(i,l){i&1&&(o(0,"div",0)(1,"p-card",1)(2,"p",2)(3,"p-floatlabel")(4,"input",3),r("ngModelChange",function(s){return l.credentials.identifier=s}),a(),o(5,"label"),v(6,"Handle"),a()(),o(7,"p-floatlabel",4)(8,"input",5),r("ngModelChange",function(s){return l.credentials.password=s}),a(),o(9,"label"),v(10,"Password"),a()(),o(11,"p-button",6),r("onClick",function(){return l.onLogin()}),v(12," Login "),a()()()()),i&2&&(S(4),I("ngModel",l.credentials.identifier),S(4),I("ngModel",l.credentials.password))},dependencies:[J,H,P,w,E,A,q,R,K,C,V,N],encapsulation:2})};var Ee=[{path:"",component:F}];export{Ee as routes};
