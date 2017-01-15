"use strict";

const gulp      = require('gulp'),
      smartGrid = require('smart-grid');

module.exports = (options) => {
    return () => {
        let settings = {
            outputStyle: 'sass', /* less || scss || sass || styl */
            columns: 12, /* number of grid columns */
            offset: "30px", /* gutter width px || % */
            container: {
                maxWidth: '1200px', /* max-width оn very large screen */
                fields: '30px' /* side fields */
            },
            breakPoints: {
                lg: {
                    'width': '1100px', /* -> @media (max-width: 1100px) */
                    'fields': '30px' /* side fields */
                },
                md: {
                    'width': '960px',
                    'fields': '15px'
                },
                sm: {
                    'width': '780px',
                    'fields': '15px'
                },
                xs: {
                    'width': '560px',
                    'fields': '15px'
                }
            }
        };
        return smartGrid(options.dest, settings);
    };
};