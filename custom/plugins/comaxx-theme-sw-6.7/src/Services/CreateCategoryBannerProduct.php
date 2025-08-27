<?php declare(strict_types=1);

namespace ComaxxTheme\Services;

use Shopware\Core\Content\Category\CategoryDefinition;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\System\CustomField\CustomFieldTypes;

class CreateCategoryBannerProduct
{
    public function createCustomFields($container): void
    {
        $customFieldSetRepository = $container->get('custom_field_set.repository');
        $customFieldSetUuid = Uuid::randomHex();
        $customFieldSetRepository->upsert([
            [
                'id' => $customFieldSetUuid,
                'name' => 'comaxx_category_banner_product',
                'config' => [
                    'label' => [
                        'en-GB' => 'Product as banner',
                        'nl-NL' => 'Product als banner'
                    ]
                ],
                'customFields' => [
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_banner_product_show',
                        'type' => CustomFieldTypes::BOOL,
                        'config' => [
                            'type' => 'bool',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'bool',
                            'customFieldPosition' => 10,
                            'label' => [
                                'en-GB' => 'Show banner product',
                                'nl-NL' => 'Toon banner product'
                            ]
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_banner_product_position',
                        'type' => CustomFieldTypes::TEXT,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 20,
                            'label' => [
                                'en-GB' => 'Banner position',
                                'nl-NL' => 'Banner positie'
                            ]
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_banner_product_outer_padding',
                        'type' => CustomFieldTypes::TEXT,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 30,
                            'label' => [
                                'en-GB' => 'Banner outer padding',
                                'nl-NL' => 'Banner outer padding'
                            ]
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_banner_product_inner_padding',
                        'type' => CustomFieldTypes::TEXT,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 31,
                            'label' => [
                                'en-GB' => 'Banner inner padding',
                                'nl-NL' => 'Banner inner padding'
                            ]
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_banner_product_title',
                        'type' => CustomFieldTypes::TEXT,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 40,
                            'label' => [
                                'en-GB' => 'Banner product title',
                                'nl-NL' => 'Banner product titel'
                            ]
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_banner_product_content',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-text-editor',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 50,
                            'label' => [
                                'en-GB' => 'Banner product content',
                                'nl-NL' => 'Banner product content'
                            ]
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_banner_product_image',
                        'type' => CustomFieldTypes::MEDIA,
                        'config' => [
                            'type' => 'media',
                            'componentName' => 'sw-media-field',
                            'customFieldType' => 'media',
                            'customFieldPosition' => 6,
                            'label' => [
                                'en-GB' => 'Banner product image',
                                'nl-NL' => 'Banner product afbeelding'
                            ]
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_banner_product_background_color',
                        'type' => CustomFieldTypes::COLORPICKER,
                        'config' => [
                            'type' => 'colorpicker',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'colorpicker',
                            'customFieldPosition' => 70,
                            'label' => [
                                'en-GB' => 'Banner product background color',
                                'nl-NL' => 'Banner product achtergrondkleur'
                            ],
                            'helpText' => [
                                'en-GB' => 'If a media is uploaded, the media will be shown instead of the background color.',
                                'nl-NL' => 'Als er een media is geüpload, wordt de media in plaats van de achtergrondkleur weergegeven.'
                            ],
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_banner_product_text_color',
                        'type' => CustomFieldTypes::COLORPICKER,
                        'config' => [
                            'type' => 'colorpicker',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'colorpicker',
                            'customFieldPosition' => 80,
                            'label' => [
                                'en-GB' => 'Banner product text color',
                                'nl-NL' => 'Banner product tekstkleur'
                            ],
                            'helpText' => [
                                'en-GB' => 'This color will be applied to the text. If a media is uploaded, ensure the text is visible against the background.',
                                'nl-NL' => 'Deze kleur wordt toegepast op de tekst. Zorg ervoor dat de tekst zichtbaar is tegen de achtergrond als er een media is geüpload.'
                            ],
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_banner_product_href_text',
                        'type' => CustomFieldTypes::TEXT,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 90,
                            'label' => [
                                'en-GB' => 'Banner product redirect text',
                                'nl-NL' => 'Banner product link tekst'
                            ]
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_banner_product_button_show',
                        'type' => CustomFieldTypes::BOOL,
                        'config' => [
                            'type' => 'checkbox',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'checkbox',
                            'customFieldPosition' => 100,
                            'label' => [
                                'en-GB' => 'Show link as button',
                                'nl-NL' => 'Toon de link als knop'
                            ]
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_banner_product_button_text',
                        'type' => CustomFieldTypes::TEXT,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 110,
                            'label' => [
                                'en-GB' => 'Banner product button text',
                                'nl-NL' => 'Banner product knop tekst'
                            ],
                            'helpText' => [
                                'en-GB' => 'This text will be displayed on the button.',
                                'nl-NL' => 'Deze tekst wordt weergegeven op de knop.'
                            ],
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_banner_product_vertical_alignment',
                        'type' => CustomFieldTypes::SELECT,
                        'config' => [
                            'type' => 'select',
                            'componentName' => 'sw-single-select',
                            'customFieldType' => 'select',
                            'customFieldPosition' => 120,
                            'label' => [
                                'en-GB' => 'Vertical Alignment',
                                'nl-NL' => 'Verticale uitlijning'
                            ],
                            'options' => [
                                [
                                    'value' => 'flex-start',
                                    'label' => [
                                        'en-GB' => 'Top',
                                        'nl-NL' => 'Boven'
                                    ]
                                ],
                                [
                                    'value' => 'center',
                                    'label' => [
                                        'en-GB' => 'Middle',
                                        'nl-NL' => 'Midden'
                                    ]
                                ],
                                [
                                    'value' => 'flex-end',
                                    'label' => [
                                        'en-GB' => 'Bottom',
                                        'nl-NL' => 'Onder'
                                    ]
                                ]
                            ]
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_banner_product_text_alignment',
                        'type' => CustomFieldTypes::SELECT,
                        'config' => [
                            'type' => 'select',
                            'componentName' => 'sw-single-select',
                            'customFieldType' => 'select',
                            'customFieldPosition' => 130,
                            'label' => [
                                'en-GB' => 'Text Alignment',
                                'nl-NL' => 'Tekst uitlijning'
                            ],
                            'options' => [
                                [
                                    'value' => 'left',
                                    'label' => [
                                        'en-GB' => 'Left',
                                        'nl-NL' => 'Links'
                                    ]
                                ],
                                [
                                    'value' => 'center',
                                    'label' => [
                                        'en-GB' => 'Center',
                                        'nl-NL' => 'Midden'
                                    ]
                                ],
                                [
                                    'value' => 'right',
                                    'label' => [
                                        'en-GB' => 'Right',
                                        'nl-NL' => 'Rechts'
                                    ]
                                ]
                            ]
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_banner_product_custom_class',
                        'type' => CustomFieldTypes::TEXT,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 140,
                            'label' => [
                                'en-GB' => 'Banner custom class',
                                'nl-NL' => 'Banner custom class'
                            ]
                        ]
                    ],
                ],
                'relations' => [
                    [
                        'id' => $customFieldSetUuid,
                        'entityName' => $container->get(CategoryDefinition::class)->getEntityName()
                    ],
                ]
            ]
        ], Context::createDefaultContext());
    }
}
