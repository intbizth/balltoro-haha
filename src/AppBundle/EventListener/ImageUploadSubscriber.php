<?php

namespace AppBundle\EventListener;

use AppBundle\Entity\ImageInterface;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ImageUploadSubscriber implements ContainerAwareInterface, EventSubscriber
{
    /**
     * @var ContainerInterface;
     */
    private $container;

    /**
     * {@inheritdoc}
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    /**
     * @param $subject
     */
    private function upload($subject)
    {
        if ($subject instanceof ImageInterface && $subject->hasFile()) {
            $this->container->get('image_uploader')->upload($subject);
        }
    }

    /**
     * {@inheritdoc}
     */
    public function prePersist(LifecycleEventArgs $event)
    {
        $this->upload($event->getObject());
    }

    /**
     * {@inheritdoc}
     */
    public function preUpdate(LifecycleEventArgs $event)
    {
        $this->upload($event->getObject());
    }

    /**
     * {@inheritdoc}
     */
    public function getSubscribedEvents()
    {
        return array(
            'prePersist',
            'preUpdate',
        );
    }
}
