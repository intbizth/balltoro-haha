<?php

namespace AppBundle\DependencyInjection;

use DoS\ResourceBundle\DependencyInjection\AbstractResourceExtension;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class AppExtension extends AbstractResourceExtension
{
    protected $applicationName = 'app';

    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        return $this->configure($configs, $this->getBundleConfiguration(), $container,
            self::CONFIGURE_LOADER |
            self::CONFIGURE_DATABASE |
            self::CONFIGURE_PARAMETERS |
            self::CONFIGURE_VALIDATORS |
            self::CONFIGURE_FORMS
        );
    }

    /**
     * {@inheritdoc}
     */
    protected function getBundleConfiguration()
    {
        return new Configuration();
    }
}
