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

interface PhotoInterface extends ImageInterface, Timestampable
{
    /**
     * @return int
     */
    public function getId();

    /**
     * @return string
     */
    public function getTitle();

    /**
     * @param string $title
     */
    public function setTitle($title);

    /**
     * @return Category
     */
    public function getCategory();

    /**
     * @param Category $category
     */
    public function setCategory(Category $category = null);
}