---
sidebar: auto
meta:
 - name: keywords
   description: api typescript node.js documentation swaggerApplyType function
---
# swaggerApplyType <Badge text="Function" type="function"/>
<!-- Summary -->
<section class="symbol-info"><table class="is-full-width"><tbody><tr><th>Module</th><td><div class="lang-typescript"><span class="token keyword">import</span> { swaggerApplyType }&nbsp;<span class="token keyword">from</span>&nbsp;<span class="token string">"@tsed/swagger/src/utils/index"</span></div></td></tr><tr><th>Source</th><td><a href="https://github.com/Romakita/ts-express-decorators/blob/v5.0.2/packages/swagger/src/utils/index.ts#L0-L0">/packages/swagger/src/utils/index.ts</a></td></tr></tbody></table></section>

<!-- Overview -->
## Overview


<pre><code class="typescript-lang ">function <span class="token function">swaggerApplyType</span><span class="token punctuation">(</span>schema<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">,</span> type<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">;</span></code></pre>



<!-- Description -->
## Description

::: v-pre

Filter the null type, unsupported by swagger and apply the right type on schema.

:::