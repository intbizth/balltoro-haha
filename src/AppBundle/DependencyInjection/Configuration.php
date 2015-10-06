<?php

namespace AppBundle\DependencyInjection;

use DoS\ResourceBundle\DependencyInjection\AbstractResourceConfiguration;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;

class Configuration extends AbstractResourceConfiguration
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('app');

        $this->setDefaults($rootNode, array(
            'classes' => array(
                'category' => array(
                    'model' => 'AppBundle\Model\Category',
                    'interface' => 'AppBundle\Model\CategoryInterface',
                    'repository' => 'AppBundle\Model\CategoryRepository',
                    'controller' => 'AppBundle\Controller\CategoryController',
                    'form' => array(
                        'default' => 'AppBundle\Form\CategoryType'
                    ),
                ),
                'photo' => array(
                    'model' => 'AppBundle\Model\Photo',
                    'interface' => 'AppBundle\Model\PhotoInterface',
                    'repository' => 'AppBundle\Model\PhotoRepository',
                    'controller' => 'AppBundle\Controller\PhotoController',
                    'form' => array(
                        'default' => 'AppBundle\Form\PhotoType'
                    ),
                ),
                'swear_word' => array(
                    'model' => 'AppBundle\Model\SwearWord',
                    'interface' => 'AppBundle\Model\SwearWordInterface',
                    'repository' => 'AppBundle\Model\SwearWordRepository',
                    'controller' => 'AppBundle\Controller\SwearWordController',
                    'form' => array(
                        'default' => 'AppBundle\Form\SwearWordType'
                    ),
                ),
            ),
            'validation_groups' => array(
                'category' => array(),
                'photo' => array(),
                'swear_word' => array(),
            ),
        ));

        return $treeBuilder;
    }
}
