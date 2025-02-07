import{a as j}from"./chunk-PJSIVR75.js";import{a as B,b as P,d as V,e as H,f as S,g as O}from"./chunk-TIQDBG7I.js";import{I as A,L as E,Q as y,S as M,U as $,aa as N,ba as R}from"./chunk-2YIMH3G5.js";import{$a as _,Bb as D,Cb as L,Jb as v,Ma as C,Mb as x,Na as s,P as f,Q as d,V as c,Wa as b,Xa as m,Ya as k,_a as g,ac as z,ca as p,ib as F,kb as h,sb as o,tb as a,zb as r,zc as T}from"./chunk-T2XQEGP6.js";import"./chunk-NUMHA4AJ.js";var Z=({dt:e})=>`
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
`,ee={root:({instance:e,props:l})=>["p-inputtext p-component",{"p-filled":e.filled,"p-inputtext-sm":l.size==="small","p-inputtext-lg":l.size==="large","p-invalid":l.invalid,"p-variant-filled":l.variant==="filled","p-inputtext-fluid":l.fluid}]},J=(()=>{class e extends M{name="inputtext";theme=Z;classes=ee;static \u0275fac=(()=>{let n;return function(t){return(n||(n=p(e)))(t||e)}})();static \u0275prov=f({token:e,factory:e.\u0275fac})}return e})();var G=(()=>{class e extends ${ngModel;variant="outlined";fluid;pSize;filled;_componentStyle=c(J);get hasFluid(){let i=this.el.nativeElement.closest("p-fluid");return A(this.fluid)?!!i:this.fluid}constructor(n){super(),this.ngModel=n}ngAfterViewInit(){super.ngAfterViewInit(),this.updateFilledState(),this.cd.detectChanges()}ngDoCheck(){this.updateFilledState()}onInput(){this.updateFilledState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length||this.ngModel&&this.ngModel.model}static \u0275fac=function(i){return new(i||e)(s(S,8))};static \u0275dir=k({type:e,selectors:[["","pInputText",""]],hostAttrs:[1,"p-inputtext","p-component"],hostVars:14,hostBindings:function(i,t){i&1&&r("input",function(K){return t.onInput(K)}),i&2&&h("p-filled",t.filled)("p-variant-filled",t.variant==="filled"||t.config.inputStyle()==="filled"||t.config.inputVariant()==="filled")("p-inputtext-fluid",t.hasFluid)("p-inputtext-sm",t.pSize==="small")("p-inputfield-sm",t.pSize==="small")("p-inputtext-lg",t.pSize==="large")("p-inputfield-lg",t.pSize==="large")},inputs:{variant:"variant",fluid:[2,"fluid","fluid",z],pSize:"pSize"},features:[x([J]),_,g]})}return e})(),W=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=m({type:e});static \u0275inj=d({})}return e})();var ie=({dt:e})=>`
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
`,ne={root:({instance:e,props:l})=>["p-floatlabel",{"p-floatlabel-over":l.variant==="over","p-floatlabel-on":l.variant==="on","p-floatlabel-in":l.variant==="in"}]},X=(()=>{class e extends M{name="floatlabel";theme=ie;classes=ne;static \u0275fac=(()=>{let n;return function(t){return(n||(n=p(e)))(t||e)}})();static \u0275prov=f({token:e,factory:e.\u0275fac})}return e})();var le=["*"],I=(()=>{class e extends ${_componentStyle=c(X);variant="over";static \u0275fac=(()=>{let n;return function(t){return(n||(n=p(e)))(t||e)}})();static \u0275cmp=b({type:e,selectors:[["p-floatlabel"],["p-floatLabel"],["p-float-label"]],hostVars:8,hostBindings:function(i,t){i&2&&h("p-floatlabel",!0)("p-floatlabel-over",t.variant==="over")("p-floatlabel-on",t.variant==="on")("p-floatlabel-in",t.variant==="in")},inputs:{variant:"variant"},features:[x([X]),g],ngContentSelectors:le,decls:1,vars:0,template:function(i,t){i&1&&(D(),L(0))},dependencies:[T,y],encapsulation:2,changeDetection:0})}return e})(),q=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=m({type:e});static \u0275inj=d({imports:[I,y,y]})}return e})();var w=class e{constructor(l,n){this.authService=l;this.messageService=n}credentials={identifier:"",password:""};APP_PASSWORD_REGEX=new RegExp("[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}");onLogin(){this.credentials.identifier.trim().length&&this.APP_PASSWORD_REGEX.exec(this.credentials.password)?this.authService.login(this.credentials):this.messageService.add({icon:"warn",severity:"warn",summary:"Oops!",detail:"Please check your credentials."})}static \u0275fac=function(n){return new(n||e)(s(j),s(E))};static \u0275cmp=b({type:e,selectors:[["app-login"]],decls:13,vars:2,consts:[[1,"flex","h-full","items-center","justify-center"],["header","Login"],[1,"flex","flex-col","mt-8"],["pInputText","","name","handle",3,"ngModelChange","keyup.enter","ngModel"],[1,"mt-8"],["pInputText","","name","password",3,"ngModelChange","keyup.enter","ngModel"],[1,"mt-6",3,"onClick"]],template:function(n,i){n&1&&(o(0,"div",0)(1,"p-card",1)(2,"p",2)(3,"p-floatlabel")(4,"input",3),r("ngModelChange",function(u){return i.credentials.identifier=u})("keyup.enter",function(){return i.onLogin()}),a(),o(5,"label"),v(6,"Handle"),a()(),o(7,"p-floatlabel",4)(8,"input",5),r("ngModelChange",function(u){return i.credentials.password=u})("keyup.enter",function(){return i.onLogin()}),a(),o(9,"label"),v(10,"App Password"),a()(),o(11,"p-button",6),r("onClick",function(){return i.onLogin()}),v(12," Login "),a()()()()),n&2&&(C(4),F("ngModel",i.credentials.identifier),C(4),F("ngModel",i.credentials.password))},dependencies:[O,V,H,S,P,B,W,G,q,I,R,N],encapsulation:2})};var Ne=[{path:"",component:w}];export{Ne as routes};
