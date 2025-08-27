<?php declare(strict_types=1);

namespace ComaxxTheme\Subscriber;

use Shopware\Core\Content\Product\Events\ProductListingResultEvent;
use Shopware\Core\Content\Product\ProductCollection;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\RangeFilter;
use Shopware\Core\Content\Product\Events\ProductListingCriteriaEvent;
use Shopware\Core\Framework\Struct\ArrayStruct;

class ProductListingSubscriber implements EventSubscriberInterface
{
    private EntityRepository $productRepository;

    public function __construct(EntityRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            ProductListingResultEvent::class => 'onProductListingLoaded',
            ProductListingCriteriaEvent::class => 'onProductListingCriteria',
        ];
    }

    public function onProductListingLoaded(ProductListingResultEvent $event): void
    {
        $products = $event->getResult()->getEntities();

        foreach ($products as $product) {
            if (!$product->getParentId()) {
                $criteria = new Criteria();
                $criteria->addFilter(new EqualsFilter('parentId', $product->getId()));
                $criteria->addAssociation('options.group');

                /** @var ProductCollection $variants */
                $variants = $this->productRepository->search($criteria, $event->getContext())->getEntities();

                $filteredOptions = [];
                $seenColors = [];
                $optionGroups = [];

                foreach ($variants as $variant) {
                    foreach ($variant->getOptions() as $option) {
                        $group = $option->getGroup();
                        if ($group) {
                            $optionGroups[$group->getId()] = $group->getDisplayType();

                            if ($group->getDisplayType() === 'color') {
                                $hex = $option->getColorHexCode();
                                if (!in_array($hex, $seenColors)) {
                                    $filteredOptions[] = [
                                        'id'        => $option->getId(),
                                        'label'     => $option->getName(),
                                        'variantId' => $variant->getId(),
                                        'hex'       => $hex,
                                    ];
                                    $seenColors[] = $hex;
                                }
                            }
                        }
                    }
                }

                // Check of ALLEEN kleur-varianten bestaan
                $onlyColorVariants = count(array_unique($optionGroups)) === 1 && reset($optionGroups) === 'color';

                $product->addExtension(
                    'filteredVariants',
                    new ArrayStruct([
                        'options' => $filteredOptions,
                        'onlyColor' => $onlyColorVariants
                    ])
                );
            }
        }
    }

    public function onProductListingCriteria(ProductListingCriteriaEvent $event): void
    {
        $request = $event->getRequest();
        $criteria = $event->getCriteria();

        if ($request->query->get('isSale') === '1') {
            $criteria->addFilter(new RangeFilter('price.percentage', [
                RangeFilter::LT => 100
            ]));
        }
    }
}