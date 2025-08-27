<?php declare(strict_types=1);

namespace ComaxxTheme\Services;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\System\CustomField\CustomFieldTypes;
use Shopware\Core\System\SalesChannel\SalesChannelDefinition;

class CreateSalesChannelCustomerSupport
{
    public function createCustomFields($container): void
    {
        $customFieldSetRepository = $container->get('custom_field_set.repository');
        $customFieldSetUuid = Uuid::randomHex();

        // Define the custom fields
        $customFieldSetRepository->upsert([
            [
                'id' => $customFieldSetUuid,
                'name' => 'comaxx_customer_support', // Adjusted the name for clarity
                'config' => [
                    'label' => [
                        'en-GB' => 'Customer service settings',
                        'nl-NL' => 'Klantenservice instellingen'
                    ]
                ],
                'customFields' => [
                    // Checkbox field to show customer service element
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_customer_service_show_element',
                        'type' => CustomFieldTypes::BOOL, // Using BOOL type for checkbox
                        'config' => [
                            'type' => 'bool',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'bool',
                            'customFieldPosition' => 1,
                            'label' => [
                                'en-GB' => 'Show Customer Service Element',
                                'nl-NL' => 'Toon Klantenservice Element'
                            ],
                        ]
                    ],
                    // Media field for background image
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_customer_service_bg_image',
                        'type' => CustomFieldTypes::MEDIA,
                        'config' => [
                            'label' => [
                                'en-GB' => 'Background Image',
                                'nl-NL' => 'Achtergrondafbeelding'
                            ],
                            'customFieldType' => 'media',
                            'componentName' => 'sw-media-field',
                            'customFieldPosition' => 2
                        ]
                    ],
                    // Checkbox to fix the background attachment
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_customer_service_bg_attachment_fixed',
                        'type' => CustomFieldTypes::BOOL, // Checkbox type
                        'config' => [
                            'label' => [
                                'en-GB' => 'Fix Background Attachment',
                                'nl-NL' => 'Vaste achtergrond bijlagen'
                            ],
                            'customFieldType' => 'bool',
                            'componentName' => 'sw-field',
                            'customFieldPosition' => 3
                        ]
                    ],
                    // Color picker for background color (in case no image is uploaded)
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_customer_service_bg_color',
                        'type' => CustomFieldTypes::COLORPICKER,
                        'config' => [
                            'label' => [
                                'en-GB' => 'Background Color',
                                'nl-NL' => 'Achtergrondkleur'
                            ],
                            'helpText' => [
                                'en-GB' => 'This color will be used if no background image is uploaded.',
                                'nl-NL' => 'Deze kleur wordt gebruikt als er geen achtergrondafbeelding is geüpload.',
                                'de-DE' => 'Diese Farbe wird verwendet, wenn kein Hintergrundbild hochgeladen wurde.'
                            ],
                            'customFieldType' => 'colorpicker',
                            'componentName' => 'sw-colorpicker',
                            'customFieldPosition' => 4
                        ]
                    ],
                    // Color picker for text container background
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_customer_service_text_container_bg_color',
                        'type' => CustomFieldTypes::COLORPICKER,
                        'config' => [
                            'label' => [
                                'en-GB' => 'Text Container Background Color',
                                'nl-NL' => 'Achtergrondkleur van de tekstcontainer'
                            ],
                            'customFieldType' => 'colorpicker',
                            'componentName' => 'sw-colorpicker',
                            'customFieldPosition' => 5
                        ]
                    ],
                    // Default Text Color for all columns
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_customer_service_text_color',
                        'type' => CustomFieldTypes::COLORPICKER,
                        'config' => [
                            'label' => [
                                'en-GB' => 'Default Text Color',
                                'nl-NL' => 'Standaard tekstkleur'
                            ],
                            'customFieldType' => 'colorpicker',
                            'componentName' => 'sw-colorpicker',
                            'customFieldPosition' => 6
                        ]
                    ],
                    // Column 1 Content
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_customer_service_col_1_content',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'label' => [
                                'en-GB' => 'Column 1 Content',
                                'nl-NL' => 'Inhoud kolom 1'
                            ],
                            'customFieldType' => 'html',
                            'componentName' => 'sw-text-editor',
                            'customFieldPosition' => 7
                        ]
                    ],
                    // Column 2 Content
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_customer_service_col_2_content',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'label' => [
                                'en-GB' => 'Column 2 Content',
                                'nl-NL' => 'Inhoud kolom 2'
                            ],
                            'customFieldType' => 'html',
                            'componentName' => 'sw-text-editor',
                            'customFieldPosition' => 8
                        ]
                    ],
                    // Column 3 Content
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_customer_service_col_3_content',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'label' => [
                                'en-GB' => 'Column 3 Content',
                                'nl-NL' => 'Inhoud kolom 3'
                            ],
                            'customFieldType' => 'html',
                            'componentName' => 'sw-text-editor',
                            'customFieldPosition' => 9
                        ]
                    ],
                ],
                'relations' => [
                    [
                        'id' => $customFieldSetUuid,
                        'entityName' => $container->get(SalesChannelDefinition::class)->getEntityName()
                    ],
                ]
            ]
        ], Context::createDefaultContext());
    }
}
