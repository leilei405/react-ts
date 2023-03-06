import React from 'react';
 
// 只有在开发环境才会运行
if (process.env.WHY_RENDER) {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        // 它会跟踪我们所有的函数组件
        trackAllPureComponents: false,
    });
}