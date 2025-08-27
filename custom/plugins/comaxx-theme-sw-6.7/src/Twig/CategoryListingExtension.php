<?php

namespace ComaxxTheme\Twig;

use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Context;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class CategoryListingExtension extends AbstractExtension
{
    private EntityRepository $categoryRepository;
    private EntityRepository $productRepository;

    public function __construct(
        EntityRepository $categoryRepository,
        EntityRepository $productRepository
    ){
        $this->categoryRepository = $categoryRepository;
        $this->productRepository = $productRepository;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('get_category_custom_fields', [$this, 'getCategoryCustomFields']),
            new TwigFunction('get_product', [$this, 'getProduct']),
        ];
    }

    public function getProduct(string $productId, Context $context)
    {
        $criteria = new Criteria([$productId]);
        $criteria->addAssociation('media');
        $product = $this->productRepository->search($criteria, $context)->first();
        return $product !== null ? $product : null;
    }

    public function getCategoryCustomFields(string $categoryId, Context $context)
    {
        $criteria = new Criteria([$categoryId]);
        $criteria->addAssociation('customFields');
        $category = $this->categoryRepository->search($criteria, $context)->first();
        return $category ? $category->getCustomFields() : [];
    }
}
