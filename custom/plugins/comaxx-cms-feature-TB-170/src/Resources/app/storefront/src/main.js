import CategorySliderPlugin from './js-plugin/category-slider.plugin';
import FaqAccordionPlugin from './js-plugin/faq-accordion.plugin';
import TabsPlugin from './js-plugin/tabs.plugin';
import ComaxxImageSliderPlugin from './js-plugin/comaxx-image-slider.plugin';

// Register your plugin via the existing PluginManager
const PluginManager = window.PluginManager;

PluginManager.register('CategorySlider', CategorySliderPlugin, '[data-category-slider]');
PluginManager.register('FaqAccordion', FaqAccordionPlugin, '[data-faq]');
PluginManager.register('Tabs', TabsPlugin, '[data-tabs]');
PluginManager.register('ComaxxImageSlider', ComaxxImageSliderPlugin, '[data-comaxx-image-slider]');
