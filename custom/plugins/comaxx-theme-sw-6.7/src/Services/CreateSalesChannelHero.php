<?php declare(strict_types=1);

namespace ComaxxTheme\Services;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\System\CustomField\CustomFieldTypes;
use Shopware\Core\System\SalesChannel\SalesChannelDefinition;

class CreateSalesChannelHero
{
    public function createCustomFields($container): void
    {
        $customFieldSetRepository = $container->get('custom_field_set.repository');
        $customFieldSetUuid = Uuid::randomHex();

        // Define the custom fields
        $customFieldSetRepository->upsert([
            [
                'id' => $customFieldSetUuid,
                'name' => 'comaxx_hero', // Adjusted the name for clarity
                'config' => [
                    'label' => [
                        'en-GB' => 'Hero settings',
                        'nl-NL' => 'Hero instellingen'
                    ]
                ],
                'customFields' => [
                    // Checkbox field to show customer service element
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_show',
                        'type' => CustomFieldTypes::BOOL, // Using BOOL type for checkbox
                        'config' => [
                            'type' => 'bool',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'bool',
                            'customFieldPosition' => 10,
                            'label' => [
                                'en-GB' => 'Show Hero',
                                'nl-NL' => 'Toon hero'
                            ],
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_width',
                        'type' => CustomFieldTypes::SELECT,
                        'config' => [
                            'type' => 'select',
                            'componentName' => 'sw-single-select',
                            'customFieldType' => 'select',
                            'customFieldPosition' => 20,
                            'label' => [
                                'en-GB' => 'Hero width',
                                'nl-NL' => 'Hero breedte',
                            ],
                            'options' => [
                                [
                                    'label' => [
                                        'en-GB' => 'Full width',
                                        'nl-NL' => 'Volledige breedte',
                                    ],
                                    'value' => 'full'
                                ],
                                [
                                    'label' => [
                                        'en-GB' => 'Full width (content in container)',
                                        'nl-NL' => 'Volledige breedte (content in container)',
                                    ],
                                    'value' => 'full-container'
                                ]
                            ],
                            'placeholder' => [
                                'en-GB' => 'Select hero width',
                                'nl-NL' => 'Selecteer hero breedte',
                            ],
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_height_desktop',
                        'type' => CustomFieldTypes::SELECT,
                        'config' => [
                            'type' => 'select',
                            'componentName' => 'sw-single-select',
                            'customFieldType' => 'select',
                            'customFieldPosition' => 20,
                            'label' => [
                                'en-GB' => 'Hero height Desktop',
                                'nl-NL' => 'Hero hoogte Desktop',
                            ],
                            'options' => [
                                [
                                    'label' => [
                                        'en-GB' => 'Small',
                                        'nl-NL' => 'Small',
                                    ],
                                    'value' => '45vh'
                                ],
                                [
                                    'label' => [
                                        'en-GB' => 'Medium',
                                        'nl-NL' => 'Medium',
                                    ],
                                    'value' => '60vh'
                                ],
                                [
                                    'label' => [
                                        'en-GB' => 'Large',
                                        'nl-NL' => 'Large',
                                    ],
                                    'value' => '70vh'
                                ],
                                [
                                    'label' => [
                                        'en-GB' => 'Full screen height',
                                        'nl-NL' => 'Volledig scherm hoogte',
                                    ],
                                    'value' => '100vh'
                                ]
                            ],
                            'placeholder' => [
                                'en-GB' => 'Select hero height for desktop',
                                'nl-NL' => 'Selecteer hero hoogte voor desktop',
                            ],
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_height_mobile',
                        'type' => CustomFieldTypes::SELECT,
                        'config' => [
                            'type' => 'select',
                            'componentName' => 'sw-single-select',
                            'customFieldType' => 'select',
                            'customFieldPosition' => 20,
                            'label' => [
                                'en-GB' => 'Hero height Mobile',
                                'nl-NL' => 'Hero hoogte Mobile',
                            ],
                            'options' => [
                                [
                                    'label' => [
                                        'en-GB' => 'Small',
                                        'nl-NL' => 'Small',
                                    ],
                                    'value' => '50vh'
                                ],
                                [
                                    'label' => [
                                        'en-GB' => 'Medium',
                                        'nl-NL' => 'Medium',
                                    ],
                                    'value' => '60vh'
                                ],
                                [
                                    'label' => [
                                        'en-GB' => 'Large',
                                        'nl-NL' => 'Large',
                                    ],
                                    'value' => '80vh'
                                ],
                                [
                                    'label' => [
                                        'en-GB' => 'Full screen height',
                                        'nl-NL' => 'Volledig scherm hoogte',
                                    ],
                                    'value' => '100vh'
                                ]
                            ],
                            'placeholder' => [
                                'en-GB' => 'Select hero height mobile',
                                'nl-NL' => 'Selecteer hero hoogte mobiel',
                            ],
                        ]
                    ],
                    // Media field for background image
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_media_desktop',
                        'type' => CustomFieldTypes::MEDIA,
                        'config' => [
                            'label' => [
                                'en-GB' => 'Background Image (Desktop)',
                                'nl-NL' => 'Achtergrondafbeelding (Desktop)'
                            ],
                            'customFieldType' => 'media',
                            'componentName' => 'sw-media-field',
                            'customFieldPosition' => 30
                        ]
                    ],
                    // Media field for background image
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_media_mobile',
                        'type' => CustomFieldTypes::MEDIA,
                        'config' => [
                            'label' => [
                                'en-GB' => 'Background Image (Mobile)',
                                'nl-NL' => 'Achtergrondafbeelding (Mobile)'
                            ],
                            'customFieldType' => 'media',
                            'componentName' => 'sw-media-field',
                            'customFieldPosition' => 40
                        ]
                    ],
                    // Hero body content
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_content',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'label' => [
                                'en-GB' => 'Hero content',
                                'nl-NL' => 'Hero content'
                            ],
                            'customFieldType' => 'html',
                            'componentName' => 'sw-text-editor',
                            'customFieldPosition' => 50
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_content_width_desktop',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 60,
                            'label' => [
                                'en-GB' => 'Content width desktop',
                                'nl-NL' => 'Content width desktop',
                            ]
                        ],
                        'allowCustomerWrite' => true
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_padding_desktop',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 70,
                            'label' => [
                                'en-GB' => 'Content padding desktop',
                                'nl-NL' => 'Content padding desktop',
                            ]
                        ],
                        'allowCustomerWrite' => true
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_padding_mobile',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 80,
                            'label' => [
                                'en-GB' => 'Content padding mobile',
                                'nl-NL' => 'Content padding mobile',
                            ]
                        ],
                        'allowCustomerWrite' => true
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_custom_class',
                        'type' => CustomFieldTypes::HTML,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 90,
                            'label' => [
                                'en-GB' => 'Custom class',
                                'nl-NL' => 'Custom class',
                            ]
                        ],
                        'allowCustomerWrite' => true
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_header_topbar_background_color',
                        'type' => CustomFieldTypes::COLORPICKER,
                        'config' => [
                            'type' => 'colorpicker',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'colorpicker',
                            'customFieldPosition' => 200,
                            'label' => [
                                'en-GB' => 'Hero header top bar background color',
                                'nl-NL' => 'Hero header top bar achtergrond kleur'
                            ],
                            'helpText' => [
                                'en-GB' => 'Background color of the top bar when the hero is visible. If empty, the theme color is used.',
                                'nl-NL' => 'Achtergrondkleur van de topbar wanneer de hero zichtbaar is. Indien leeg, wordt de themakleur gebruikt.'
                            ],
                        ]
                    ],
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_header_topbar_text_color',
                        'type' => CustomFieldTypes::COLORPICKER,
                        'config' => [
                            'type' => 'colorpicker',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'colorpicker',
                            'customFieldPosition' => 210,
                            'label' => [
                                'en-GB' => 'Hero header top bar text color',
                                'nl-NL' => 'Hero header top bar tekstkleur',
                            ],
                            'helpText' => [
                                'en-GB' => 'Text color of the top bar when the hero is visible.',
                                'nl-NL' => 'Tekstkleur van de topbar wanneer de hero zichtbaar is.',
                            ],
                        ],
                    ],

                    // Top bar icon color
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_header_topbar_icon_color',
                        'type' => CustomFieldTypes::COLORPICKER,
                        'config' => [
                            'type' => 'colorpicker',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'colorpicker',
                            'customFieldPosition' => 220,
                            'label' => [
                                'en-GB' => 'Hero header top bar icon color',
                                'nl-NL' => 'Hero header top bar icoonkleur',
                            ],
                            'helpText' => [
                                'en-GB' => 'Icon color of the top bar when the hero is visible.',
                                'nl-NL' => 'Kleur van iconen in de topbar wanneer de hero zichtbaar is.',
                            ],
                        ],
                    ],

                    // Header logo (media field)
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_header_logo',
                        'type' => CustomFieldTypes::MEDIA,
                        'config' => [
                            'componentName' => 'sw-media-field',
                            'customFieldType' => 'media',
                            'customFieldPosition' => 230,
                            'label' => [
                                'en-GB' => 'Hero header logo',
                                'nl-NL' => 'Hero header logo',
                            ],
                            'helpText' => [
                                'en-GB' => 'Logo to display in the header when the hero is visible. If empty, the default logo is used.',
                                'nl-NL' => 'Logo dat getoond wordt in de header wanneer de hero zichtbaar is. Indien leeg, wordt het standaardlogo gebruikt.',
                            ],
                        ],
                    ],

                    // Header background color
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_header_background_color',
                        'type' => CustomFieldTypes::COLORPICKER,
                        'config' => [
                            'type' => 'colorpicker',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'colorpicker',
                            'customFieldPosition' => 240,
                            'label' => [
                                'en-GB' => 'Hero header background color',
                                'nl-NL' => 'Hero header achtergrondkleur',
                            ],
                            'helpText' => [
                                'en-GB' => 'Background color of the header when the hero is visible.',
                                'nl-NL' => 'Achtergrondkleur van de header wanneer de hero zichtbaar is.',
                            ],
                        ],
                    ],

                    // Header action icons color
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_header_action_icon_color',
                        'type' => CustomFieldTypes::COLORPICKER,
                        'config' => [
                            'type' => 'colorpicker',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'colorpicker',
                            'customFieldPosition' => 250,
                            'label' => [
                                'en-GB' => 'Hero header action icons color',
                                'nl-NL' => 'Hero header actie-iconen kleur',
                            ],
                            'helpText' => [
                                'en-GB' => 'Color of action icons (e.g. search, account, cart) when the hero is visible.',
                                'nl-NL' => 'Kleur van actie-iconen (zoals zoeken, account, winkelwagen) wanneer de hero zichtbaar is.',
                            ],
                        ],
                    ],

                    // Navigation background color
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_header_nav_background_color',
                        'type' => CustomFieldTypes::COLORPICKER,
                        'config' => [
                            'type' => 'colorpicker',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'colorpicker',
                            'customFieldPosition' => 260,
                            'label' => [
                                'en-GB' => 'Hero header navigation background color',
                                'nl-NL' => 'Hero header navigatie achtergrondkleur',
                            ],
                            'helpText' => [
                                'en-GB' => 'Background color of the navigation when the hero is visible.',
                                'nl-NL' => 'Achtergrondkleur van de navigatie wanneer de hero zichtbaar is.',
                            ],
                        ],
                    ],

                    // Navigation link color
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_header_nav_link_color',
                        'type' => CustomFieldTypes::COLORPICKER,
                        'config' => [
                            'type' => 'colorpicker',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'colorpicker',
                            'customFieldPosition' => 270,
                            'label' => [
                                'en-GB' => 'Hero header navigation link color',
                                'nl-NL' => 'Hero header navigatie linkkleur',
                            ],
                            'helpText' => [
                                'en-GB' => 'Link color of the navigation when the hero is visible.',
                                'nl-NL' => 'Linkkleur van de navigatie wanneer de hero zichtbaar is.',
                            ],
                        ],
                    ],

                    // Navigation link background color
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_header_nav_link_background_color',
                        'type' => CustomFieldTypes::COLORPICKER,
                        'config' => [
                            'type' => 'colorpicker',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'colorpicker',
                            'customFieldPosition' => 280,
                            'label' => [
                                'en-GB' => 'Hero header navigation link background color',
                                'nl-NL' => 'Hero header navigatie link achtergrondkleur',
                            ],
                            'helpText' => [
                                'en-GB' => 'Background color for navigation links when the hero is visible.',
                                'nl-NL' => 'Achtergrondkleur voor navigatielinks wanneer de hero zichtbaar is.',
                            ],
                        ],
                    ],

                    // Navigation active link color
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_header_nav_active_link_color',
                        'type' => CustomFieldTypes::COLORPICKER,
                        'config' => [
                            'type' => 'colorpicker',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'colorpicker',
                            'customFieldPosition' => 290,
                            'label' => [
                                'en-GB' => 'Hero header navigation active link color',
                                'nl-NL' => 'Hero header navigatie actieve linkkleur',
                            ],
                            'helpText' => [
                                'en-GB' => 'Active link color in the navigation when the hero is visible.',
                                'nl-NL' => 'Kleur van actieve links in de navigatie wanneer de hero zichtbaar is.',
                            ],
                        ],
                    ],

                    // Navigation active background color
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_hero_header_nav_active_background_color',
                        'type' => CustomFieldTypes::COLORPICKER,
                        'config' => [
                            'type' => 'colorpicker',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'colorpicker',
                            'customFieldPosition' => 300,
                            'label' => [
                                'en-GB' => 'Hero header navigation active background color',
                                'nl-NL' => 'Hero header navigatie actieve achtergrondkleur',
                            ],
                            'helpText' => [
                                'en-GB' => 'Background color of active navigation links when the hero is visible.',
                                'nl-NL' => 'Achtergrondkleur van actieve navigatielinks wanneer de hero zichtbaar is.',
                            ],
                        ],
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
