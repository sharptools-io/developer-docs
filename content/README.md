---
pageClass: home-page
home: true
heroImage: /icons/android-chrome-150x150.png
heroText: SharpTools
tagline: Developer Documentation Center
actionText: Get Started
actionLink: /developer-tools/

customFeatures:
- title: Developer Tools
  details: Learn how to develop custom tiles with HTML and JavaScript. Bring the integration with other services into your favorite dashboards the way you liked.
  linkUrl: /developer-tools/
  linkText: Read More
- title: Need Help?
  details: Post questions in the developer community and get help from other fellow developers. Our community developers are very skilled and willing to share their expertises.
  linkUrl: https://community.sharptools.io/c/sharptools-web/developers/
  linkText: Go to Community
- title: Looking for Inspirations?
  details: Check out the existing works shared by the community developers and get inspirations. Don't forget to share and show off your work to the community as well.
  linkUrl: https://community.sharptools.io/c/sharptools-web/developers/
  linkText: Check out Works
---

<div class="features">
  <div class="feature" v-for="feat in $page.frontmatter.customFeatures">
    <h2>{{ feat.title }}</h2>
    <p>{{ feat.details }}</p>  
    <div class="feature-links">
      <a v-if="feat.linkUrl" :href='feat.linkUrl'>{{feat.linkText}} →</a>
    </div>            
  </div>
</div>