export const DEFAULT_APOLLO_INBOUND_APP_ID = "6a02957afcc7ee0019235ec4";

interface ApolloInboundScriptOptions {
    formSelector: string;
    appId?: string;
    timeoutMs?: number;
}

export function createApolloInboundScript({
    formSelector,
    appId = DEFAULT_APOLLO_INBOUND_APP_ID,
    timeoutMs = 15000,
}: ApolloInboundScriptOptions): string {
    const selector = JSON.stringify(formSelector);
    const app = JSON.stringify(appId);
    const timeout = Number.isFinite(timeoutMs) && timeoutMs > 0 ? Math.floor(timeoutMs) : 15000;

    return `(function initApolloInbound(){var TIMEOUT_MS=${timeout};var FORM_SELECTOR=${selector};var timeoutId;var isDone=false;var style=document.createElement('style');style.id='apollo-form-prehide-css';style.textContent='form:has(input[type="email" i]),form:has(input[name="email" i]),.hs-form-iframe{position:relative!important}form:has(input[type="email" i])::before,form:has(input[name="email" i])::before,.hs-form-iframe::before{content:"";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;width:50px;height:50px;margin:auto;border:2.5px solid #e1e1e1;border-top:2.5px solid #9ea3a6;border-radius:50%;animation:spin 1s linear infinite;background-color:transparent;pointer-events:auto;z-index:999999;opacity:1}form:has(input[type="email" i]) *,form:has(input[name="email" i]) *,.hs-form-iframe *{opacity:0!important;user-select:none!important;pointer-events:none!important}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}';(document.head||document.documentElement).appendChild(style);function cleanup(){isDone=true;var styleEl=document.getElementById('apollo-form-prehide-css');if(styleEl)styleEl.remove();if(timeoutId)clearTimeout(timeoutId);}function initForm(){if(isDone)return;var form=document.querySelector(FORM_SELECTOR);if(!form){requestAnimationFrame(initForm);return;}var config={appId:${app},formElement:FORM_SELECTOR,options:{autoDetect:false},onReady:function(){cleanup();},onError:function(err){console.error('[Apollo] Form enrichment init error:',err);cleanup();}};try{if(window.ApolloInbound&&window.ApolloInbound.formEnrichment&&typeof window.ApolloInbound.formEnrichment.init==='function'){window.ApolloInbound.formEnrichment.init(config);return;}if(window.ApolloInbound&&typeof window.ApolloInbound.initFormEnrichment==='function'){window.ApolloInbound.initFormEnrichment(config);return;}throw new Error('ApolloInbound form enrichment API not found');}catch(err){console.error('[Apollo] Error initializing form enrichment:',err);cleanup();}}timeoutId=setTimeout(function(){console.warn('[Apollo] Form enrichment timeout - revealing forms.');cleanup();},TIMEOUT_MS);var nocache=Math.random().toString(36).substring(7);var script=document.createElement('script');script.src='https://assets.apollo.io/js/apollo-inbound.js?nocache='+nocache;script.defer=true;script.onerror=function(){console.error('[Apollo] Failed to load form enrichment script');cleanup();};script.onload=initForm;document.head.appendChild(script);})();`;
}
