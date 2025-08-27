import template from './tinymce.html.twig';
import './tinymce.scss';

const { Component } = Shopware;
const { Criteria } = Shopware.Data;

let comaxxStyles = [
    {
        title: 'Button Primary',
        classes: 'btn btn-primary',
        selector: 'a', // Apply to existing links
    },
    {
        title: 'Button Secondary',
        classes: 'btn btn-secondary',
        selector: 'a',
    },
    {
        title: 'Button Tertiary',
        classes: 'btn btn-tertiary',
        selector: 'a',
    },
    { title: 'Custom class 1', classes: 'custom-style-first', inline: 'span' },
    { title: 'Custom class 2', classes: 'custom-style-second', inline: 'span' },
    {
        title: 'Horizontal List',
        classes: 'list-horizontal',
        selector: 'ul, ol', // Apply class to unordered and ordered lists
    },
    {
        title: 'Vertical List',
        classes: 'list-vertical',
        selector: 'ul, ol',
    },
];

Component.override('sw-text-editor', {
    template,

    inject: ['systemConfigApiService', 'repositoryFactory'],

    data() {
        ``;
        return {
            config: {},
            domain: 'ComaxxCms.config',
            handleValue: true,
            mediaModalIsOpen: false,
            categoriesCollection: [],
            settings: {
                mainType: null,
                entityName: null,
                entityId: null,
                url: null,
                newTab: false,
            },
            loaded: false,
            inheritedGrid: false,
            currentEditorInstance: false,
            uniqueNameTiny: 'tinyMce' + this._uid,
        };
    },

    watch: {
        value: {
            handler() {
                if (this.currentEditorInstance) {
                    window.tinymce.setActive(this.currentEditorInstance);
                }

                if (this.$refs[this.uniqueNameTiny] && this.$refs[this.uniqueNameTiny].innerHtml !== this.value) {
                    if (window.tinymce && window.tinymce.activeEditor && !this.isInlineEdit) {
                        if (!this.value) {
                            window.tinymce.activeEditor.setContent('');
                        } else {
                            if (this.value !== window.tinymce.activeEditor.getContent()) {
                                window.tinymce.activeEditor.setContent(this.value);
                            }
                        }
                    }
                    this.$refs[this.uniqueNameTiny].innerHtml = this.value;
                    this.content = this.value;
                    this.isEmpty = this.emptyCheck(this.content);
                    this.placeholderVisible = this.isEmpty;
                }
            },
        },
    },

    computed: {},

    mounted() {
        if (this.isInlineEdit) {
            this.mountedComponent();
        } else {
            if (!this.disabled && !this.loaded) {
                // Code that will run only after the entire view has been rendered to provide Javascript issues
                this.$nextTick(function () {
                    this.loaded = true;
                    this.loadTinyMceEditor();
                });
            } else {
                this.inheritedGrid = true;
            }
        }
    },

    methods: {
        loadTinyMceEditor() {
            const lang = Shopware.Application.getContainer('factory').locale.getLastKnownLocale();
            this.readConfig(lang);
        },

        readConfig(lang) {
            let customConfigurationValue = '';
            var self = this;

            return this.systemConfigApiService.getValues(this.domain).then((data) => {
                this.config = data;
                const customConfiguration = this.config && this.config['ComaxxCms.config.customMceConfig'] ? this.config['ComaxxCms.config.customMceConfig'] : '';

                let config = this.getTinyMceConfig(lang);
                try {
                    if (customConfiguration) {
                        if (typeof customConfiguration === 'object') {
                            customConfigurationValue = customConfiguration;
                        } else {
                            customConfigurationValue = JSON.parse(customConfiguration);
                        }
                        const keys = Object.keys(customConfigurationValue).sort();
                        keys.forEach((key) => {
                            if (key === 'style_formats') {
                                config[key] = comaxxStyles.concat(customConfigurationValue[key]);
                            } else {
                                config[key] = customConfigurationValue[key];
                            }
                        });
                    }
                } catch (error) {
                    console.log('The custom configuration is invalid.');
                }
                window.tinymce.init(config);
                self.currentEditorInstance = window.tinymce.activeEditor;
            });
        },

        getTinyMceConfig(lang) {
            const tiny = this;
            const path = `${(Shopware.Context.api.assetsPath + 'ComaxxCms.config'.split('.')[0]).toLowerCase() + '/administration/css/comaxx-cms.css'}`;
            // CS compatibility
            return {
                target: this.$refs[this.uniqueNameTiny],
                language: lang.substring(0, 2),
                skin: 'oxide',
                themes: 'advanced',
                height: 450,
                plugins: 'searchreplace wordcount link lists',
                menu: {
                    file: { title: 'File', items: '' },
                    edit: { title: 'Edit', items: 'searchreplace' },
                    view: { title: 'View', items: '' },
                    insert: { title: 'Insert', items: '' },
                    format: { title: 'Format', items: 'formats' },
                    tools: { title: 'Tools', items: 'wordcount' },
                    help: { title: 'Help', items: '' },
                },
                menubar: 'file edit view insert format tools',
                contextmenu: '',
                toolbar:
                    'formatselect | undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor | removeformat link',
                browser_spellcheck: false,
                importcss_append: true,
                autosave_ask_before_unload: false,
                relative_urls: false,
                convert_urls: false,
                remove_script_host: true,
                style_formats_merge: false,
                style_formats: comaxxStyles,
                templates: [],
                template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                quickbars_selection_toolbar: 'bold italic | h2 h3 blockquote quickimage quicktable',
                noneditable_noneditable_class: 'mceNonEditable',
                toolbar_mode: 'wrap',
                extended_valid_elements: 'button[*]|script[src|async|defer|type|charset|crossorigin]',
                force_br_newlines: true,
                formats: {
                    span: { inline: 'span', classes: 'tinymce-span' },
                    span: { inline: 'div', classes: 'tinymce-div' },
                },
                content_css: path,
                block_formats: 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Preformatted=pre;',
                init_instance_callback: function (editor) {
                    editor.on('Change', tiny.onChange);
                },
                setup: (editor) => {
                    editor.on('SetContent', tiny.onChange);

                    if (typeof $ === 'function') {
                        editor.on('blur', () => {
                            $('.tox-pop').remove();
                        });
                    }
                },
                file_picker_callback: function (callback, value, meta) {
                    tiny.mediaModalIsOpen = true;
                    tiny.filePickerCallback = callback;
                    tiny.filePickerMeta = meta;
                },
            };
        },

        resetSettings() {
            this.settings.mainType = null;
            this.settings.entityName = null;
            this.settings.entityId = null;
            this.settings.url = null;
            this.settings.newTab = false;
            this.settings.title = null;
        },

        onSelectionAdd(item) {
            if (item) {
                this.emptyCategoriesCollection();
                this.setCategoriesCollection(item);
                this.categoriesCollection.add(item);
            }
        },

        onChange(e) {
            this.emitHtmlContent(e.target.getContent());
            this.handleValue = false;
        },

        onContentChange() {
            this.isEmpty = this.emptyCheck(this.getContentValue());
            this.placeholderVisible = this.isEmpty;

            this.setWordCount();
        },

        setWordCount() {
            if (this.$refs[this.uniqueNameTiny]) {
                this.textLength = this.$refs[this.uniqueNameTiny].innerText.length;
            }
        },

        getContentValue() {
            if (!this.$refs[this.uniqueNameTiny] || !this.$refs[this.uniqueNameTiny].innerHTML) {
                return null;
            }

            if (!this.$refs[this.uniqueNameTiny].textContent || !this.$refs[this.uniqueNameTiny].textContent.length || this.$refs[this.uniqueNameTiny].textContent.length <= 0) {
                return null;
            }

            return this.$refs[this.uniqueNameTiny].innerHTML;
        },

        removeFocus() {
            if (!this.isActive) {
                return;
            }

            if (this.$refs[this.uniqueNameTiny] && this.$refs[this.uniqueNameTiny].innerHTML.length <= 0) {
                this.placeholderVisible = true;
            }

            this.isActive = false;
            this.emitContent();
            document.removeEventListener('mousedown', this.onDocumentClick);
        },
    },
});
