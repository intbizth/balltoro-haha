<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class PhotoType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', 'text', array(
                'required' => true,
            ))

            ->add('file', 'file', array(
                'required' => false,
            ))

            ->add('category', 'app_category_choice', array(
                'choice_label' => 'name',
                'required' => true,
            ))
        ;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'app_photo';
    }
}
