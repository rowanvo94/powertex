<?php declare(strict_types=1);

namespace ComaxxTheme\Services;

use Shopware\Core\Content\Cms\CmsBlockDefinition;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\System\CustomField\CustomFieldTypes;

class CreateSidebarConfig
{
    public function createCustomFields($container): void
    {
        $customFieldSetRepository = $container->get('custom_field_set.repository');

        $customFieldSetUuid = Uuid::randomHex();

        $customFieldSetRepository->upsert([
            [
                'id' => $customFieldSetUuid,
                'name' => 'comaxx_cms_block_sidebar',
                'config' => [
                    'label' => [
                        'en-GB' => 'Sidebar CMS Block Fields',
                        'nl-NL' => 'Sidebar CMS Blok Velden',
                    ],
                ],
                'customFields' => [
                    [
                        'id' => Uuid::randomHex(),
                        'name' => 'comaxx_sidebar_custom_text',
                        'type' => CustomFieldTypes::TEXT,
                        'config' => [
                            'type' => 'text',
                            'componentName' => 'sw-field',
                            'customFieldType' => 'text',
                            'customFieldPosition' => 1,
                            'label' => [
                                'en-GB' => 'Sidebar Custom Text',
                                'nl-NL' => 'Sidebar aangepaste tekst',
                            ],
                        ],
                    ],
                ],
                'relations' => [
                    [
                        'entityName' => 'cms_section',
                    ],
                ],
            ],
        ], Context::createDefaultContext());
    }
}