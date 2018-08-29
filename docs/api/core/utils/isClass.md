---
sidebar: auto
meta:
 - name: keywords
   description: api typescript node.js documentation isClass function
---
# isClass <Badge text="Function" type="function"/>
<!-- Summary -->
<section class="symbol-info"><table class="is-full-width"><tbody><tr><th>Module</th><td><div class="lang-typescript"><span class="token keyword">import</span> { isClass }&nbsp;<span class="token keyword">from</span>&nbsp;<span class="token string">"@tsed/core"</span></div></td></tr><tr><th>Source</th><td><a href="https://github.com/Romakita/ts-express-decorators/blob/v4.30.1/src//core/utils/ObjectUtils.ts#L0-L0">/core/utils/ObjectUtils.ts</a></td></tr></tbody></table></section>

<!-- Overview -->
## Overview


<pre><code class="typescript-lang ">function <span class="token function">isClass</span><span class="token punctuation">(</span>target<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  return !<span class="token function">isPrimitiveOrPrimitiveClass</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> && !<span class="token function">isObject</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> && !<span class="token function">isDate</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> && target !== undefined && !<span class="token function">isPromise</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

/**
 * Return true if the value is an empty <span class="token keyword">string</span><span class="token punctuation">,</span> null or undefined.
 * @param value
 * @returns <span class="token punctuation">{</span><span class="token keyword">boolean</span><span class="token punctuation">}</span>
 */</code></pre>