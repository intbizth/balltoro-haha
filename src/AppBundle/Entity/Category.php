<?php

namespace AppBundle\Entity;

use Gedmo\Timestampable\Timestampable;
use JMS\Serializer\Annotation as JMS;

/**
 * Category
 */
class Category implements Timestampable
{
    use \Gedmo\Timestampable\Traits\Timestampable;

    /**
     * @var integer
     * @JMS\Expose()
     */
    private $id;

    /**
     * @var string
     * @JMS\Expose()
     */
    private $name;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Category
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
}
