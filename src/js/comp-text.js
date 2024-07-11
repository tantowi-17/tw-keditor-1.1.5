(function ($) {
    var KEditor = $.keditor;
    var flog = KEditor.log;

    // Text component
    KEditor.components['text'] = {
        options: {
            alignment: {
                options: ['left', 'right']
            },
            toolbar: [
                'heading', '|', 'bold', 'italic', 'link', '|',
                'bulletedList', 'numberedList', '|',
                'blockQuote', 'insertTable', 'undo', 'redo'
            ]
        },

        init: function (contentArea, container, component, keditor) {
            flog('init "text" component', component);

            var self = this;
            var options = keditor.options;

            var componentContent = component.children('.keditor-component-content');
            componentContent.prop('contenteditable', true);

            console.log("config: ", this)



            // Initialize CKEditor 5
            InlineEditor
                .create(componentContent[0], self.options)
                .then(function (editor) {
                    console.log("EDITOR : ", editor)
                    component.data('editor', editor); // Store editor instance in component data
                    if (typeof options.onComponentReady === 'function') {
                        options.onComponentReady.call(contentArea, component, editor);
                    }

                    // Listen for content changes
                    componentContent.on('input', function (e) {
                        if (typeof options.onComponentChanged === 'function') {
                            options.onComponentChanged.call(contentArea, e, component);
                        }

                        if (typeof options.onContainerChanged === 'function') {
                            options.onContainerChanged.call(contentArea, e, container);
                        }

                        if (typeof options.onContentChanged === 'function') {
                            options.onContentChanged.call(contentArea, e);
                        }
                    });
                })
                .catch(function (error) {
                    console.error(error);
                });
        },

        getContent: function (component, keditor) {
            flog('getContent "text" component', component);

            var editor = component.data('editor');
            if (editor) {
                return editor.getData();
            } else {
                return component.find('.keditor-component-content').html();
            }
        },

        destroy: function (component, keditor) {
            flog('destroy "text" component', component);

            var editor = component.data('editor'); // Retrieve editor instance from component data
            if (editor) {
                editor.destroy();
            }
        }
    };

})(jQuery);
