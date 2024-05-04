# NSWFparse

[Demo](https://zachey01.github.io/demo/nswfparse.html)

### Installation

```shell
npm instal nswfparse
```

or

```html
<script src="https://unpkg.com/nswfparse/dist/nswfparse.js"></script>
```

## Example

```js
const nswfparse = require("nswfparse");

// Rule34
const options = {
  tags: ["toys", "forest"],
  numPage: 1,
  limit: 1, // limit per request, maximum 100
  remove_empty: true,
  parse_tags: true, // whether to use tags
  random: false, // get random post
};
nswfparse
  .r34(options)
  .then((payload) => {
    console.log(payload);
  })
  .catch((error) => {
    console.error(error);
  });

// Reddit
nswfparse.reddit.real
  .pov()
  .then((payload) => {
    console.log(payload);
  })
  .catch((error) => {
    console.error(error);
  });
// Or
nswfparse
  .redditCustom(["cats"])
  .then((payload) => {
    console.log(payload);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Categories for Reddit

#### Real

- cumShot
- girlThighs
- bdsm
- lesbian
- bisexy
- sissy
- girlAss
- panties
- pov
- shemale
- gayPorn
- gayAss
- gayCumshot
- gayTwinks
- dickPic
- manToys
- femboy

#### Hentai

- femboy
- hentai
- yaoi
- futanari

#### Furry

- yaoi
- hentai
- real

### TODO

- [x] Add Rule34
- [x] Support in browsers
- [ ] Add Pornhub
- [ ] Add Xvideos
