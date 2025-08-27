<?php declare(strict_types=1);

namespace ComaxxTheme\Services;

use Shopware\Core\Content\Property\PropertyGroupDefinition;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\System\CustomField\CustomFieldTypes;

class CreatePropertiesAdditionalSettings
{
    public function createCustomFields($container): void
    {
        $customFieldSetRepository = $container->get('custom_field_set.repository');
        $customFieldSetUuid = Uuid::randomHex();
        $customFieldSetRepository->upsert([
            [
                'id' => $customFieldSetUuid,
                'name' => 'comaxx_properties_additional_settings',
                'config' => [
                    'label' => [
                        'en-GB' => 'Property additional settings',
                        'nl-NL' => 'Extra instellingen voor eigenschappen'
                    ]
                ],
                'customFields' => [
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_property_collapsed',
                        'type' => CustomFieldTypes::BOOL,
                        'config' => [
                            'type' => 'bool',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'bool',
                            'customFieldPosition' => 10,
                            'label' => [
                                'en-GB' => 'Property group is expanded in filters',
                                'nl-NL' => 'Eigenschapsgroep is uitgeklapt in filters'
                            ]
                        ]
                    ]
                ],
                'relations' => [
                    [
                        'id' => $customFieldSetUuid,
                        'entityName' => $container->get(PropertyGroupDefinition::class)->getEntityName()
                    ],
                ]
            ]
        ], Context::createDefaultContext());
    }
}