<?php

namespace ComaxxTheme\Twig;

use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\Context;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class CategorySidebarExtension extends AbstractExtension
{
    private EntityRepository $productRepository;

    public function __construct(EntityRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('get_category_product_count', [$this, 'getCategoryProductCount']),
        ];
    }

    public function getCategoryProductCount(string $categoryId, Context $context): int
    {
        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('categoriesRo.id', $categoryId));
        $criteria->addFilter(new EqualsFilter('active', true));
        $criteria->addFilter(new EqualsFilter('parentId', null));

        return $this->productRepository->search($criteria, $context)->getTotal();
    }
}
