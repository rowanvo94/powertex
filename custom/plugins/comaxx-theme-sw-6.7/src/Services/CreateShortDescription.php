<?php declare(strict_types=1);

namespace ComaxxTheme\Services;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\System\CustomField\CustomFieldTypes;

class CreateShortDescription
{
    public function createCustomFields($container): void
    {
        $customFieldSetRepository = $container->get('custom_field_set.repository');
        $customFieldSetUuid = Uuid::randomHex();
        $customFieldSetRepository->upsert([
            [
                'id' => $customFieldSetUuid,
                'name' => 'comaxx_product',
                'config' => [
                    'label' => [
                        'en-GB' => 'Short description',
                        'nl-NL' => 'Korte beschrijving'
                    ]
                ],
                'customFields' => [
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_product_short_description',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-text-editor',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 1,
                            'label' => [
                                'en-GB' => 'Product short description',
                                'nl-NL' => 'Product korte beschrijving'
                            ]
                        ]
                    ],
                ],
                'relations' => [
                    [
                        'id' => $customFieldSetUuid,
                        'entityName' => $container->get(ProductDefinition::class)->getEntityName()
                    ],
                ]
            ]
        ], Context::createDefaultContext());
    }
}