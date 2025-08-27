import AnnouncementBannerPlugin from './js-plugin/announcement-banner.plugin';
import TopBarCarouselPlugin from './js-plugin/top-bar-carousel.plugin';
import DetailDescriptionTogglePlugin from './js-plugin/detail-description-toggle.plugin';
import StickyHeaderPlugin from './js-plugin/sticky-header.plugin';
import StickyHeaderScrollTopPlugin from './js-plugin/sticky-header-scroll-top.plugin';
import RegisterTogglePlugin from './js-plugin/register-toggle.plugin';
import FlyoutHoverPlugin from './js-plugin/flyout-hover.plugin';
import FlyoutBackdropPlugin from './js-plugin/flyout-backdrop.plugin';
import SearchFocusPlugin from './js-plugin/search-focus.plugin';
import SearchKeyboardPlugin from './js-plugin/search-keyboard.plugin';
import FlyoutClosePlugin from './js-plugin/flyout-close.plugin';
import MegaMenuPlugin from './js-plugin/mega-menu.plugin';
import ShowSecondThumbPlugin from './js-plugin/show-second-thumb.plugin';
import DetailBuyStickyPlugin from './js-plugin/detail-buy-sticky.plugin';
import RegisterButtonCheckPlugin from './js-plugin/register-button-check.plugin';
import HeroPlugin from './js-plugin/hero.plugin';
import ListingColorSwatchPlugin from './js-plugin/listing-color-swatch.plugin';

// Register your plugin via the existing PluginManager
const PluginManager = window.PluginManager;

PluginManager.register('AnnouncementBanner', AnnouncementBannerPlugin, '[data-announcement-banner]');
PluginManager.register('TopBarCarousel', TopBarCarouselPlugin, '[data-top-bar-carousel]');
PluginManager.register('DetailDescriptionToggle', DetailDescriptionTogglePlugin, '[data-detail-description-toggle]');
PluginManager.register('StickyHeader', StickyHeaderPlugin, '[data-sticky-header-default]');
PluginManager.register('StickyHeaderScrollTop', StickyHeaderScrollTopPlugin, '[data-sticky-header-scroll-top]');
PluginManager.register('RegisterToggle', RegisterTogglePlugin, '[data-register-toggle]');
PluginManager.register('FlyoutHover', FlyoutHoverPlugin, '[data-flyout-hover]');
PluginManager.register('FlyoutBackdrop', FlyoutBackdropPlugin, '[data-backdrop-show]');
PluginManager.register('SearchFocus', SearchFocusPlugin, '[data-search-focus]');
PluginManager.register('SearchKeyboard', SearchKeyboardPlugin, '[data-search-keyboard]');
PluginManager.register('FlyoutClose', FlyoutClosePlugin, '[data-flyout-close]');
PluginManager.register('MegaMenu', MegaMenuPlugin, '[data-has-mega-menu]');
PluginManager.register('ShowSecondThumb', ShowSecondThumbPlugin, '[data-second-thumb]');
PluginManager.register('DetailBuySticky', DetailBuyStickyPlugin, '[data-buy-sticky]');
PluginManager.register('RegisterButtonCheck', RegisterButtonCheckPlugin, '[data-register-check]');
PluginManager.register('Hero', HeroPlugin, '[data-has-hero]');
PluginManager.register('ListingColorSwatch', ListingColorSwatchPlugin, '[data-listing-color-swatch]');
