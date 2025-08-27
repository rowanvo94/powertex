<?php

namespace ComaxxTheme\Twig;

use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class CategoryHighlightExtension extends AbstractExtension
{
    private EntityRepository $categoryRepository;

    public function __construct(EntityRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('get_category', [$this, 'getCategory']),
            new TwigFunction('get_category_highlight_tree', [$this, 'getCategoryHighlightTree']),
        ];
    }

    public function getCategory(string $categoryId, SalesChannelContext $context)
    {
        $criteria = new Criteria([$categoryId]);
        $criteria->addAssociation('children');
        return $this->categoryRepository->search($criteria, $context->getContext())->getEntities()->first();
    }

    public function getCategoryHighlightTree(string $categoryId, SalesChannelContext $context, $level = 0, &$result = [])
    {
        $category = $this->getCategory($categoryId, $context);
        $result[] = [$category, $level];

        if (!empty($category->children)) {
            foreach ($category->children as $subcategory) {
                $this->getCategoryHighlightTree($subcategory->id, $context, $level + 1, $result);
            }
        }

        return $result;
    }
}
