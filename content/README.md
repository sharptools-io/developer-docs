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
  details: Learn how to develop custom tiles with HTML and JavaScript. Integrate services into your favorite dashboards the way you like.
  linkUrl: /developer-tools/
  linkText: Read More
  linkTarget: _self
- title: Need Help?
  details: Post questions in the developer community and get help from fellow developers. SharpTools staff can be found in the community too!
  linkUrl: https://community.sharptools.io/c/sharptools-web/developers/
  linkText: Visit Community
  linkTarget: _blank
- title: Looking for Inspiration?
  details: Check out existing work shared by community developers and draw inspiration. Don't forget to share and show off your work too!
  linkUrl: https://community.sharptools.io/c/sharptools-web/developers/
  linkText: Community Projects
  linkTarget: _blank
---

<div class="features">
  <div class="feature" v-for="feat in $page.frontmatter.customFeatures">
    <h2>{{ feat.title }}</h2>
    <p>{{ feat.details }}</p>  
    <div class="feature-links">
      <a v-if="feat.linkUrl" :href='feat.linkUrl' :target="feat.linkTarget">{{feat.linkText}} →</a>
    </div>            
  </div>
</div>