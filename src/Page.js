import React from 'react'
import Link from 'pure-redux-router-link'
import ScrollContainer from 'redux-first-router-scroll-container'
export default () => 
  <div style={{color: 'white'}}>
    	As part of server-side rendering, you obviously should embed within the page the js files with the no_css.js extension. The .js files will be loaded by default when Webpack asyncronously requests them, and you won't have to worry about embedding them in any response strings.
      <a href="#foo">CLICK ME</a>
      What about Aphrodite, Glamor, StyleTron, Styled-Components, Styled-Jsx, etc?

      If you effectively use code-splitting, Exract Css Chunks can be a far better option than using emerging solutions like StyleTron, StyledComponents, and slightly older tools like Aphrodite, Glamor, etc. We aren't fans of either rounds of tools because of several issues, but particularly because they all have a runtime overhead. Every time your React component is rendered with those, CSS is generated and updated within the DOM. On the server, you're going to also see unnecessary cycles for flushing the CSS along the critical render path. Next.js's styled-jsx, by the way, doesn't even work on the server--not so good when it comes to flash of unstyled content (FOUC).

      The reason Extract CSS Chunk can be a better option is because we also generate multiple sets of CSS based on what is actually "used", but without the runtime overhead. The difference is our definition of "used" is modules determined statically (which may not in fact be rendered) vs. what is in the "critical render path" (as is the case with the other tools).
      <div id="foo">YOYOYO</div>
      So yes, our CSS may be mildly larger and include unnecessary css, but our no_css.js bundles will be a lot smaller as they don't need to inject any styles. See, even though those solutions have the smallest possible CSS file size, their javascript bundles, in order to continue to render your components styled properly on the client, must contain the necessary CSS for all posibilities! Those solutions serve both your entire bundle's CSS (in your javascript) and the CSS flushed from the critical render path.

      On top of that, those are extra packages all with a huge number of issues in their Github repos corresponding to various limitations in the CSS they generate--something that is prevented when your definition for "CSS-in-JS" is simply importing CSS files compiled as normal by powerful proven CSS-specific processors.
      <Link href="/page2">PAGE2</Link>
      Now with that out of the way, 
      
      <ScrollContainer scrollKey='foo' shouldUpdateScroll={() => true}>
        <div id="scrollBox" style={{overflow: 'scroll', background: 'purple', height: 200}}>
          no continual runtime overhead during render using HoCs that inject styles
          smaller JS bundles without CSS injection
          You DO NOT need to clutter your component code with a specialized way of applying CSS (HoCs, styled elements)!
          The way you import module-based styles is exactly how you would import styles in React Native that exist in a separate file, which allows for extremely interchangeable code between React Native and regular React. Hurray!
          pretty much already does everything covered by @vjeux's 2014 css-in-js talk, besides dead code elimination. Dead code elimination is only solved for the other tools--as per the explanation above how the CSS is in the JS anyway--so much as Webpack and Uglify can remove JS that is not used. Either way, it's not a stretch to eventually add this feature to extract-text-webpack-plugin as well as this plugin. Hey, maybe it already has it??
          Conclusion:

          We love CSS modules; no less, no more.

          Long live the dream of Code Splitting Everywhere!

          Notes on extract-text-webpack-plugin

          Most the code comes from the original Extract Text Webpack Plugin--the goal is to merge this functionality back into that package at some point, though that process is not looking good. So that might be a while. Until then I'd feel totally comfortable just using this package. Though it took a while to make (and figure out how the original package worked), very little code has changed, and it won't be hard to keep in sync with upstream changes.

          Contributing
        </div>
      </ScrollContainer>

      for completeness let's compare what bytes of just the CSS are sent over the wire. The difference basically is minimal. Whereas solutions that flush from the critical render path will capture no more than the precise bits of CSS from the if/else branches followed, Extract Css Chunks is all about you effectively using code-splitting to insure, for example, you don't serve your Administration Panel's CSS in your public-facing site, etc. In other words, it's all about avoiding serving large swaths of CSS from completely different sections of your app. I.e. the biggest gains available to you.

      This is where the real problem lies--where the real amount of unnecessary CSS comes from. If you effectively code-split your app, you may end up with 10 chunks. Now you can serve just the corresonding CSS for that chunk. If you try to go even farther and remove the css not used in the render path, you're likely acheiving somewhere between 1-20% of the gains you achieved by thorough code-splitting. In other words, code splitting fulfills the 80/20 rule and attains the simple sweetspot of 80% optimization you--as a balanced, level-headed, non-neurotic and professional developer--are looking to achieve.

      In short, by putting code splitting in appropriate places you have a lot of control over the CSS files that are created and can send a sensible minimal amount of associated bytes over the wire for the first request, perhaps even the smallest amount of all options.

      It's our perspective that you have achieved 80-99% of the performance gains (i.e. the creation of small relevant css files) at this static stage. Offloading this work to the runtime stage is ultimately nit-picking and results in diminishing returns. When you factor that your JS bundle has to contain that JS anyway, those solutions make less and less sense from the perspective of reducing bytes delivered in the initial request.

      There may be other reasons to use those tools (e.g. you don't like setting up webpack configs, or somehow you're really fond of pre-creating many <div /> elements with their styles), but we prefer a simple standards-based way (without HoCs or specialized style components) to import styles just as you would in React Native. However to give the other tools credit, many of them likely started out with a different problem motivating them: avoiding webpack configs so you can include packages and their contained CSS without client apps being required to setup something like CSS loaders in Webpack. Having your CSS completely contained in true JS has its use cases, but at the application level--especially when you're already using something like Webpack--we fail to see its benefits. About all they share is a solution to avoiding flashes of unstyled content (FOUC), except one can save you a lot more bytes in what you send over the wire and save you from a continual runtime overhead where it's not needed. Honorable Mention: StyleTron's concept of "atomic declaration-level deduplication" where it will make a class out of, say, color: blue so you don't need to send redundant styles certainly is a novel innovation, but again if the code still exists in your JS and you're building an application using Webpack (instead of a package), what's the point. In fact, it just makes editing the stylesheets in your browser developer tools more complicated. One benefit of critical render path solutions is the browser can spend less time matching the smaller number of styles to new DOM nodes as they appear, but then again it also has to spend the time injecting and parsing the new styles constantly, which is likely costlier.

      As an aside, so many apps share code between web and React Native--so the answer to the styles problem must be one that is identical for both. From that perspective importing a styles object still makes a lot of sense. You're not missing out on the fundamental aspect of CSS-in-JSS: isolated component-level styles and the ability to import them just like any other javascript code. Put them in other files, and use tools like extract-css-chunks-webpack-plugin and your pre-processors of choice that innately get styles right for the browser. As long as you're using CSS Modules, you're still at the cutting edge of CSS-in-JSS. Let's just say the other tools took one wrong turn and took it too far, when we already were at our destination.

      SUMMARY OF BENEFITS COMPARED TO "CRITICAL-RENDER-PATH" SOLUTIONS:


      no continual runtime overhead during render using HoCs that inject styles
      smaller JS bundles without CSS injection
      You DO NOT need to clutter your component code with a specialized way of applying CSS (HoCs, styled elements)!
      The way you import module-based styles is exactly how you would import styles in React Native that exist in a separate file, which allows for extremely interchangeable code between React Native and regular React. Hurray!
      pretty much already does everything covered by @vjeux's 2014 css-in-js talk, besides dead code elimination. Dead code elimination is only solved for the other tools--as per the explanation above how the CSS is in the JS anyway--so much as Webpack and Uglify can remove JS that is not used. Either way, it's not a stretch to eventually add this feature to extract-text-webpack-plugin as well as this plugin. Hey, maybe it already has it??
      Conclusion:

      We love CSS modules; no less, no more.

      Long live the dream of Code Splitting Everywhere!

      Notes on extract-text-webpack-plugin

      Most the code comes from the original Extract Text Webpack Plugin--the goal is to merge this functionality back into that package at some point, though that process is not looking good. So that might be a while. Until then I'd feel totally comfortable just using this package. Though it took a while to make (and figure out how the original package worked), very little code has changed, and it won't be hard to keep in sync with upstream changes.

      Contributing

      We use commitizen, so run npm run commit to make commits. A command-line form will appear, requiring you answer a few questions to automatically produce a nicely formatted commit. Releases, semantic version numbers, tags and changelogs will automatically be generated based on these commits thanks to semantic-release.
</div>


export const Page2 = () =>
  <div style={{color: 'white'}}>
    	As part of server-side rendering, you obviously should embed within the page the js files with the no_css.js extension. The .js files will be loaded by default when Webpack asyncronously requests them, and you won't have to worry about embedding them in any response strings.
<a href="#bar">CLICK ME</a>
What about Aphrodite, Glamor, StyleTron, Styled-Components, Styled-Jsx, etc?

If you effectively use code-splitting, Exract Css Chunks can be a far better option than using emerging solutions like StyleTron, StyledComponents, and slightly older tools like Aphrodite, Glamor, etc. We aren't fans of either rounds of tools because of several issues, but particularly because they all have a runtime overhead. Every time your React component is rendered with those, CSS is generated and updated within the DOM. On the server, you're going to also see unnecessary cycles for flushing the CSS along the critical render path. Next.js's styled-jsx, by the way, doesn't even work on the server--not so good when it comes to flash of unstyled content (FOUC).

The reason Extract CSS Chunk can be a better option is because we also generate multiple sets of CSS based on what is actually "used", but without the runtime overhead. The difference is our definition of "used" is modules determined statically (which may not in fact be rendered) vs. what is in the "critical render path" (as is the case with the other tools).
<div id="bar">YOYOYO</div>
So yes, our CSS may be mildly larger and include unnecessary css, but our no_css.js bundles will be a lot smaller as they don't need to inject any styles. See, even though those solutions have the smallest possible CSS file size, their javascript bundles, in order to continue to render your components styled properly on the client, must contain the necessary CSS for all posibilities! Those solutions serve both your entire bundle's CSS (in your javascript) and the CSS flushed from the critical render path.

On top of that, those are extra packages all with a huge number of issues in their Github repos corresponding to various limitations in the CSS they generate--something that is prevented when your definition for "CSS-in-JS" is simply importing CSS files compiled as normal by powerful proven CSS-specific processors.
<Link href="/page">PAGE2</Link>
Now with that out of the way, for completeness let's compare what bytes of just the CSS are sent over the wire. The difference basically is minimal. Whereas solutions that flush from the critical render path will capture no more than the precise bits of CSS from the if/else branches followed, Extract Css Chunks is all about you effectively using code-splitting to insure, for example, you don't serve your Administration Panel's CSS in your public-facing site, etc. In other words, it's all about avoiding serving large swaths of CSS from completely different sections of your app. I.e. the biggest gains available to you.

This is where the real problem lies--where the real amount of unnecessary CSS comes from. If you effectively code-split your app, you may end up with 10 chunks. Now you can serve just the corresonding CSS for that chunk. If you try to go even farther and remove the css not used in the render path, you're likely acheiving somewhere between 1-20% of the gains you achieved by thorough code-splitting. In other words, code splitting fulfills the 80/20 rule and attains the simple sweetspot of 80% optimization you--as a balanced, level-headed, non-neurotic and professional developer--are looking to achieve.

In short, by putting code splitting in appropriate places you have a lot of control over the CSS files that are created and can send a sensible minimal amount of associated bytes over the wire for the first request, perhaps even the smallest amount of all options.

It's our perspective that you have achieved 80-99% of the performance gains (i.e. the creation of small relevant css files) at this static stage. Offloading this work to the runtime stage is ultimately nit-picking and results in diminishing returns. When you factor that your JS bundle has to contain that JS anyway, those solutions make less and less sense from the perspective of reducing bytes delivered in the initial request.

There may be other reasons to use those tools (e.g. you don't like setting up webpack configs, or somehow you're really fond of pre-creating many <div /> elements with their styles), but we prefer a simple standards-based way (without HoCs or specialized style components) to import styles just as you would in React Native. However to give the other tools credit, many of them likely started out with a different problem motivating them: avoiding webpack configs so you can include packages and their contained CSS without client apps being required to setup something like CSS loaders in Webpack. Having your CSS completely contained in true JS has its use cases, but at the application level--especially when you're already using something like Webpack--we fail to see its benefits. About all they share is a solution to avoiding flashes of unstyled content (FOUC), except one can save you a lot more bytes in what you send over the wire and save you from a continual runtime overhead where it's not needed. Honorable Mention: StyleTron's concept of "atomic declaration-level deduplication" where it will make a class out of, say, color: blue so you don't need to send redundant styles certainly is a novel innovation, but again if the code still exists in your JS and you're building an application using Webpack (instead of a package), what's the point. In fact, it just makes editing the stylesheets in your browser developer tools more complicated. One benefit of critical render path solutions is the browser can spend less time matching the smaller number of styles to new DOM nodes as they appear, but then again it also has to spend the time injecting and parsing the new styles constantly, which is likely costlier.

As an aside, so many apps share code between web and React Native--so the answer to the styles problem must be one that is identical for both. From that perspective importing a styles object still makes a lot of sense. You're not missing out on the fundamental aspect of CSS-in-JSS: isolated component-level styles and the ability to import them just like any other javascript code. Put them in other files, and use tools like extract-css-chunks-webpack-plugin and your pre-processors of choice that innately get styles right for the browser. As long as you're using CSS Modules, you're still at the cutting edge of CSS-in-JSS. Let's just say the other tools took one wrong turn and took it too far, when we already were at our destination.

SUMMARY OF BENEFITS COMPARED TO "CRITICAL-RENDER-PATH" SOLUTIONS:

no continual runtime overhead during render using HoCs that inject styles
smaller JS bundles without CSS injection
You DO NOT need to clutter your component code with a specialized way of applying CSS (HoCs, styled elements)!
The way you import module-based styles is exactly how you would import styles in React Native that exist in a separate file, which allows for extremely interchangeable code between React Native and regular React. Hurray!
pretty much already does everything covered by @vjeux's 2014 css-in-js talk, besides dead code elimination. Dead code elimination is only solved for the other tools--as per the explanation above how the CSS is in the JS anyway--so much as Webpack and Uglify can remove JS that is not used. Either way, it's not a stretch to eventually add this feature to extract-text-webpack-plugin as well as this plugin. Hey, maybe it already has it??
Conclusion:

We love CSS modules; no less, no more.

Long live the dream of Code Splitting Everywhere!

Notes on extract-text-webpack-plugin

Most the code comes from the original Extract Text Webpack Plugin--the goal is to merge this functionality back into that package at some point, though that process is not looking good. So that might be a while. Until then I'd feel totally comfortable just using this package. Though it took a while to make (and figure out how the original package worked), very little code has changed, and it won't be hard to keep in sync with upstream changes.

Contributing

We use commitizen, so run npm run commit to make commits. A command-line form will appear, requiring you answer a few questions to automatically produce a nicely formatted commit. Releases, semantic version numbers, tags and changelogs will automatically be generated based on these commits thanks to semantic-release.
</div>

