---
sidebar: auto
meta:
 - name: keywords
   description: api typescript node.js documentation ExclusiveMaximum decorator
---
# ExclusiveMaximum <Badge text="Decorator" type="decorator"/>
<!-- Summary -->
<section class="symbol-info"><table class="is-full-width"><tbody><tr><th>Module</th><td><div class="lang-typescript"><span class="token keyword">import</span> { ExclusiveMaximum }&nbsp;<span class="token keyword">from</span>&nbsp;<span class="token string">"@tsed/common"</span></div></td></tr><tr><th>Source</th><td><a href="https://github.com/Romakita/ts-express-decorators/blob/v5.0.2/packages/common/src/jsonschema/decorators/exclusiveMaximum.ts#L0-L0">/packages/common/src/jsonschema/decorators/exclusiveMaximum.ts</a></td></tr></tbody></table></section>

<!-- Overview -->
## Overview


<pre><code class="typescript-lang ">function <span class="token function">ExclusiveMaximum</span><span class="token punctuation">(</span>maximum<span class="token punctuation">:</span> <span class="token keyword">number</span><span class="token punctuation">,</span> exclusiveMaximum?<span class="token punctuation">:</span> <span class="token keyword">boolean</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>...parameters<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> =&gt<span class="token punctuation">;</span> <span class="token keyword">any</span><span class="token punctuation">;</span></code></pre>



<!-- Description -->
## Description

::: v-pre

The value of `exclusiveMaximum` MUST be number, representing an exclusive upper limit for a numeric instance.

If the instance is a number, then the instance is valid only if it has a value strictly less than (not equal to) `exclusiveMaximum`.

## Example
### With primitive type

```typescript
class Model {
   @ExclusiveMaximum(10)
   property: number;
}
```

Will produce:

```json
{
  "type": "object",
  "properties": {
    "property": {
      "type": "number",
      "exclusiveMaximum": 10
    }
  }
}
```

### With array type

```typescript
class Model {
   @ExclusiveMaximum(10)
   @PropertyType(Number)
   property: number[];
}
```

Will produce:

```json
{
  "type": "object",
  "properties": {
    "property": {
      "type": "array",
      "items": {
         "type": "number",
         "exclusiveMaximum": 10
      }
    }
  }
}
```


:::