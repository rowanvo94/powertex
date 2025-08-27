<?php declare(strict_types=1);

namespace ComaxxTheme\Services;

use Shopware\Core\Content\Category\CategoryDefinition;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\System\CustomField\CustomFieldTypes;

class CreateCategoryAdditionalMedia
{
    public function createCustomFields($container): void
    {
        $customFieldSetRepository = $container->get('custom_field_set.repository');
        $customFieldSetUuid = Uuid::randomHex();
        $categoryAdditionalMedia = 3;

        for ($i = 1; $i <= $categoryAdditionalMedia; $i++) {
            $customFieldSetRepository->upsert([
                [
                    'id' => $customFieldSetUuid,
                    'name' => 'comaxx_category_additional_media',
                    'config' => [
                        'label' => [
                            'en-GB' => 'Additional media',
                            'nl-NL' => 'Additional media'
                        ]
                    ],
                    'customFields' => [
                        [
                            'id' => Uuid::randomHex(),
                            'name' => 'comaxx_category_additional_media_image' . $i,
                            'type' => CustomFieldTypes::MEDIA,
                            'config' => [
                                'type' => 'media',
                                'componentName' => 'sw-media-field',
                                'customFieldType' => 'media',
                                'customFieldPosition' => ($i + 1),
                                'label' => [
                                    'en-GB' => 'Additional media ' . $i,
                                    'nl-NL' => 'Additional media ' . $i
                                ]
                            ]
                        ],
                        [
                            'id' => Uuid::randomHex(),
                            'name' => 'comaxx_category_additional_media_subtitle' . $i,
                            'type' => CustomFieldTypes::MEDIA,
                            'config' => [
                                'type' => 'text',
                                'componentName' => 'sw-field',
                                'customFieldType' => 'text',
                                'customFieldPosition' => ($i + 1),
                                'label' => [
                                    'en-GB' => 'Media subtitle ' . $i,
                                    'nl-NL' => 'Media subtitle ' . $i
                                ]
                            ]
                        ],
                        [
                            'id' => Uuid::randomHex(),
                            'name' => 'comaxx_category_additional_media_title' . $i,
                            'type' => CustomFieldTypes::MEDIA,
                            'config' => [
                                'type' => 'text',
                                'componentName' => 'sw-field',
                                'customFieldType' => 'text',
                                'customFieldPosition' => ($i + 1),
                                'label' => [
                                    'en-GB' => 'Media title ' . $i,
                                    'nl-NL' => 'Media title ' . $i
                                ]
                            ]
                        ],
                        [
                            'id' => Uuid::randomHex(),
                            'name' => 'comaxx_category_additional_media_link' . $i,
                            'type' => CustomFieldTypes::MEDIA,
                            'config' => [
                                'type' => 'text',
                                'componentName' => 'sw-field',
                                'customFieldType' => 'text',
                                'customFieldPosition' => ($i + 1),
                                'label' => [
                                    'en-GB' => 'Media link ' . $i,
                                    'nl-NL' => 'Media link ' . $i
                                ]
                            ]
                        ],
                        [
                            'id' => Uuid::randomHex(),
                            'name' => 'comaxx_category_additional_media_color' . $i,
                            'type' => CustomFieldTypes::MEDIA,
                            'config' => [
                                'type' => 'colorpicker',
                                'componentName' => 'sw-field',
                                'customFieldType' => 'colorpicker',
                                'customFieldPosition' => ($i + 1),
                                'label' => [
                                    'en-GB' => 'Text color ' . $i,
                                    'nl-NL' => 'Text color ' . $i
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
}
