<?php declare(strict_types=1);

namespace ComaxxTheme\Services;

use Shopware\Core\Content\Category\CategoryDefinition;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\System\CustomField\CustomFieldTypes;

class CreateCategoryUSP
{
    public function createCustomFields($container): void
    {
        $customFieldSetRepository = $container->get('custom_field_set.repository');
        $customFieldSetUuid = Uuid::randomHex();
        $uspCount = 3;

        for ($i = 1; $i <= $uspCount; $i++) {
            $customFieldSetRepository->upsert([
                [
                    'id' => $customFieldSetUuid,
                    'name' => 'comaxx_category_usp',
                    'config' => [
                        'label' => [
                            'en-GB' => 'USP\'s',
                            'nl-NL' => 'USP\'s',
                        ]
                    ],
                    'customFields' => [
                        [
                            'id' => Uuid::randomHex(),
                            'name' => 'comaxx_category_usps_text' . $i,
                            'type' => CustomFieldTypes::TEXT,
                            'config' => [
                                'type' => 'text',
                                'componentName' => 'sw-field',
                                'customFieldType' => 'text',
                                'customFieldPosition' => ($i + 1),
                                'label' => [
                                    'en-GB' => 'USP text ' . $i,
                                    'nl-NL' => 'USP tekst ' . $i
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

        $customFieldSetRepository->upsert([
            [
                'id' => $customFieldSetUuid,
                'name' => 'comaxx_category',
                'customFields' => [
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_category_usps_show',
                        'type' => CustomFieldTypes::BOOL,
                        'config' => [
                            'type' => 'bool',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'bool',
                            'customFieldPosition' => 1,
                            'label' => [
                                'en-GB' => 'Show category USP\'s',
                                'nl-NL' => 'Toon categorie USP\'s'
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