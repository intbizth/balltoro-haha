<?php

namespace AppBundle\Twig;

use AppBundle\Model\ImageInterface;
use Liip\ImagineBundle\Imagine\Cache\CacheManager;

class UiExtension extends \Twig_Extension
{
    /**
     * @var CacheManager
     */
    protected $cacheManager;

    public function __construct(CacheManager $cacheManager)
    {
        $this->cacheManager = $cacheManager;
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('ui_image_url', array($this, 'getImageUrl'))
        );
    }

    public function getImageUrl(ImageInterface $im = null, $config = array())
    {

        if ($im && $im->hasPath()) {
            $filter = is_array($config) ? null : $config;
            $config = is_array($config) ? $config : array();

            if ($filter && empty($config)) {
                list($w, $h) = explode('x', $filter);

                $config = array(
                    'thumbnail' => array(
                        'size' => array($w, $h)
                    )
                );
            }

            return $this->cacheManager->getBrowserPath($im->getPath(), 'filter', $config);
        }

        $filter = is_array($config) ? '100x100' : $config;
        return 'http://placehold.it/' . $filter;
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'ui';
    }

}