<?php

/*
 * This file is part of the Intbizth Toro Project.
 *
 * (c) Intbizth
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace AppBundle\Model;

use Gedmo\Timestampable\Timestampable;

/**
 * Category
 */
interface CategoryInterface extends Timestampable
{
    /**
     * Get id
     *
     * @return integer
     */
    public function getId();

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Category
     */
    public function setName($name);

    /**
     * Get name
     *
     * @return string
     */
    public function getName();
}
