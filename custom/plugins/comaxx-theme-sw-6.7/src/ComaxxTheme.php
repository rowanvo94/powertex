<?php declare(strict_types=1);

namespace ComaxxTheme;

use Shopware\Core\Framework\Plugin;
use Shopware\Storefront\Framework\ThemeInterface;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\ContainsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\MultiFilter;
use Shopware\Core\Framework\Plugin\Context\InstallContext;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;
use ComaxxTheme\Services\CreateCategoryUSP;
use ComaxxTheme\Services\CreateShortDescription;
use ComaxxTheme\Services\CreateCategoryBannerProduct;
use ComaxxTheme\Services\CreateCategoryAdditionalMedia;
use ComaxxTheme\Services\CreateSalesChannelCustomerSupport;
use ComaxxTheme\Services\CreatePropertiesAdditionalSettings;
use ComaxxTheme\Services\CreateSalesChannelHero;
use GuzzleHttp\Promise\Create;
use ComaxxTheme\Services\CreateProductDownloads;
use ComaxxTheme\Services\CreateSidebarConfig;


class ComaxxTheme extends Plugin implements ThemeInterface
{

    public function install(InstallContext $installContext): void
    {
        parent::install($installContext);

        $this->createCustomFields();
    }

    public function uninstall(UninstallContext $uninstallContext): void
    {
        $this->deleteCustomFields();

        parent::uninstall($uninstallContext);

        if ($uninstallContext->keepUserData()) {
            return;
        }
    }

    private function createCustomFields()
    {
        $uspCustomFields = new CreateCategoryUSP();
        $uspCustomFields->createCustomFields($this->container);

        $shortDescriptionCustomField = new CreateShortDescription();
        $shortDescriptionCustomField->createCustomFields($this->container);

        $bannerAsProduct = new CreateCategoryBannerProduct();
        $bannerAsProduct->createCustomFields($this->container);

        $categoryAdditionalMedia = new CreateCategoryAdditionalMedia();
        $categoryAdditionalMedia->createCustomFields($this->container);

        $customerService = new CreateSalesChannelCustomerSupport();
        $customerService->createCustomFields($this->container);

        $customerService = new CreateSalesChannelHero();
        $customerService->createCustomFields($this->container);

        $customerService = new CreatePropertiesAdditionalSettings();
        $customerService->createCustomFields($this->container);

        $productDownloads = new CreateProductDownloads();
        $productDownloads->createCustomFields($this->container);

        $sidebarConfig = new CreateSidebarConfig();
        $sidebarConfig->createCustomFields($this->container);
    }

    private function deleteCustomFields()
    {
        $customFieldSetRepository = $this->container->get('custom_field_set.repository');

        $entityIds = $customFieldSetRepository->search(
            (new Criteria())->addFilter(new MultiFilter(MultiFilter::CONNECTION_OR, [
                new ContainsFilter('name', 'comaxx_'),
            ])),
            Context::createDefaultContext()
        )->getEntities()->getIds();

        if (count($entityIds) < 1) {
            return;
        }

        $entityIds = array_map(function ($element) {
            return ['id' => $element];
        }, array_values($entityIds));

        $customFieldSetRepository->delete(
            $entityIds,
            Context::createDefaultContext()
        );
    }
}