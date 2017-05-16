/**
 * Created by zhoumingrui on 2017/3/20.
 */

var testData

const Template = module.exports = {};

const subclasses = {
    'od': require('./middleware/echarts/EchartsLayer'),
    'heatmap': require('./middleware/echarts/EchartsLayer'),
    'scatter': require('./middleware/echarts/EchartsLayer'),
    'grid': require('./middleware/minemap/fill')
};

Template.create = function (option) {
    const TemplateClass = subclasses[option.type] || Template;
    return new TemplateClass(option);
};

Template.registerMinemap = function (minemap) {
    minemap.Template = Template;
}

Template.util = require('./util/index');

if(window.minemap) minemap.Template = Template;

