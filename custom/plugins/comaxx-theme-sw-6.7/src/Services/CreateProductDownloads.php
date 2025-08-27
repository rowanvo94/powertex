<?php declare(strict_types=1);

namespace ComaxxTheme\Services;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\System\CustomField\CustomFieldTypes;

class CreateProductDownloads
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
                        'en-GB' => 'Product Downloads',
                        'nl-NL' => 'Product Downloads'
                    ]
                ],
                'customFields' => [
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_product_downloads_1_file',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'type' => 'media',
                            'componentName' => 'sw-media-field',
                            'customFieldType' => 'media',
                            'customFieldPosition' => 1,
                            'label' => [
                                'en-GB' => 'Downloadable file 1',
                                'nl-NL' => 'Downloadbaar bestand 1',
                            ]
                        ],
                        'allowCustomerWrite' => true
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_product_downloads_1_name',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 2,
                            'label' => [
                                'en-GB' => 'Downloadable files 1 name',
                                'nl-NL' => 'Downloadbaar bestand 1 naam',
                            ]
                        ],
                        'allowCustomerWrite' => true
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_product_downloads_2_file',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'type' => 'media',
                            'componentName' => 'sw-media-field',
                            'customFieldType' => 'media',
                            'customFieldPosition' => 3,
                            'label' => [
                                'en-GB' => 'Downloadable file 2',
                                'nl-NL' => 'Downloadbaar bestand 2',
                            ]
                        ],
                        'allowCustomerWrite' => true
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_product_downloads_2_name',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 4,
                            'label' => [
                                'en-GB' => 'Downloadable files 2 name',
                                'nl-NL' => 'Downloadbaar bestand 2 naam',
                            ]
                        ],
                        'allowCustomerWrite' => true
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_product_downloads_3_file',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'type' => 'media',
                            'componentName' => 'sw-media-field',
                            'customFieldType' => 'media',
                            'customFieldPosition' => 5,
                            'label' => [
                                'en-GB' => 'Downloadable file 3',
                                'nl-NL' => 'Downloadbaar bestand 3',
                            ]
                        ],
                        'allowCustomerWrite' => true
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_product_downloads_3_name',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 6,
                            'label' => [
                                'en-GB' => 'Downloadable files 3 name',
                                'nl-NL' => 'Downloadbaar bestand 3 naam',
                            ]
                        ],
                        'allowCustomerWrite' => true
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