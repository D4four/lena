<?xml version="1.0"?>
<xsl:stylesheet version="1.0" 
								xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
								xmlns:frmwrk="Corel Framework Data"
								exclude-result-prefixes="frmwrk">
	<xsl:output method="xml" encoding="UTF-8" indent="yes"/>
	<frmwrk:uiconfig>
		<frmwrk:applicationInfo name="Corel PHOTO-PAINT" framework="Corel PHOTO-PAINT" userConfiguration="true" />
	</frmwrk:uiconfig>

	<!-- Copy everything -->
	<xsl:template match="node()|@*">
		<xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>
	</xsl:template>

	<!-- Helper to insert a new item into a menu -->
	<xsl:template match="container" mode="insert-item">
		<xsl:param name="after"></xsl:param>
		<xsl:param name="before"></xsl:param>
		<xsl:param name="content"></xsl:param>
		<xsl:copy>
			<xsl:apply-templates select="@*"/>
			<xsl:for-each select="node()">
				<xsl:if test="name()='item' and @guidRef=$before"><xsl:copy-of select="$content"/></xsl:if>
				<xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>
				<xsl:if test="name()='item' and @guidRef=$after"><xsl:copy-of select="$content"/></xsl:if>
			</xsl:for-each>
		</xsl:copy>
		<xsl:if test="not(./item[@guidRef=$after])">
			<xsl:copy-of select="$content"/>
		</xsl:if>
	</xsl:template>

	<!-- ******************* Align & Distribute ******************* -->
	<!-- Replace old menu item w/new one -->
	<xsl:template match="//item[@guidRef='ec7590f7-5605-422a-b932-58958f270bd6']">
		<xsl:copy><xsl:apply-templates select="node()|@*"/><xsl:attribute name="guidRef">e1182d6a-a44d-52b5-4384-5c7e60f2e552</xsl:attribute></xsl:copy>
	</xsl:template>
	<xsl:template match="//keySequence[@itemRef='ec7590f7-5605-422a-b932-58958f270bd6']">
		<xsl:copy><xsl:apply-templates select="node()|@*"/><xsl:attribute name="itemRef">e1182d6a-a44d-52b5-4384-5c7e60f2e552</xsl:attribute></xsl:copy>
	</xsl:template>
	<!-- Add new item to Dockers menu -->
	<xsl:template match="//commandBarData[@guid='dde2ec07-3d9d-4373-ba14-e25b3a00d8ad' or @guid='610472b0-3fe1-461a-bf3c-dd9e3078b3af']/container">
		<xsl:apply-templates mode="insert-item" select=".">
			<xsl:with-param name="after">7fa15db4-01f9-45cf-9c6a-930f2273df30</xsl:with-param>
			<xsl:with-param name="content"><item guidRef="e1182d6a-a44d-52b5-4384-5c7e60f2e552"/></xsl:with-param>
		</xsl:apply-templates>
	</xsl:template>

	<!-- ******************* Select WIA Source ******************* -->
	<!-- Add new item to Acquire Image menu -->
	<xsl:template match="//commandBarData[@guid='ca87bdf3-1bfb-4072-b85c-48980e14a05d']/container">
		<xsl:apply-templates mode="insert-item" select=".">
			<xsl:with-param name="after">e04556ff-b3fe-4818-994f-be0c44e77107</xsl:with-param>
			<xsl:with-param name="content">
				<item guidRef="493dda8f-cb6b-41bc-83e9-7c8911c7f1db"/>
				<item guidRef="266435b4-6e53-460f-9fa7-f45be187d400"/>
			</xsl:with-param>
		</xsl:apply-templates>
	</xsl:template>
	<!-- Customization List -->
	<xsl:template match="//customizationList/container/container[@modeID='7aa80134-8e64-42d1-be0a-c7ec7f6c441f']">
		<xsl:copy><xsl:apply-templates select="node()|@*"/>
			<item guidRef="493dda8f-cb6b-41bc-83e9-7c8911c7f1db"/>
			<item guidRef="2e3cde6c-409a-46dc-a830-83ea6f42084b"/>
			<item guidRef="1d9958bc-2b51-4f49-85fb-93270ec4bd70"/>
		</xsl:copy>
	</xsl:template>
	
	<!-- ******************* Sign In ******************* -->
	<!-- Add new menu items to end of Help Menu  -->
	<xsl:template match="//commandBarData[@guid='99f3965a-9ce2-4a3b-aad5-fbbf92f88710']/container">
		<xsl:copy>
			<xsl:apply-templates select="node()|@*"/>
			<item guidRef="266435b4-6e53-460f-9fa7-f45be187d400"/>
			<item guidRef="630efad4-7d85-a2be-4479-bd22f048508f"/>
			<item guidRef="a3347bda-4e93-0082-4544-319a5496c708"/>
			<item guidRef="266435b4-6e53-460f-9fa7-f45be187d400"/>
			<item guidRef="b0b0ef14-4158-278d-4679-412235e71438"/>
		</xsl:copy>
	</xsl:template>
	<!-- Remove existing sign-in button from status bar -->
	<xsl:template match="//commandBarData[@guid='8dd1c11e-7a20-4c92-b635-4b1ef0073493']//item[@guidRef='4fe7c51a-7bdc-4b99-9f1f-ccf89d999d5e']"/>
	<!-- Add new sign-in button to status bar -->
	<xsl:template match="//commandBarData[@guid='8dd1c11e-7a20-4c92-b635-4b1ef0073493']/container/container[@modeID='3ae1b504-2286-20aa-4bcb-181519c61ba8']">
		<xsl:copy>
			<xsl:apply-templates select="node()|@*"/>
			<container modeID="d77d28cf-8006-08a0-4132-e70ab297eaae" rightmostBinding="true">
        <item guidRef="4fe7c51a-7bdc-4b99-9f1f-ccf89d999d5e"/>
			</container>
		</xsl:copy>
	</xsl:template>
	<!-- Customization List -->
	<xsl:template match="//customizationList/container/container[@modeID='757fb6ac-7a21-4d29-aaad-c3789197c0bc']">
		<xsl:copy>
			<xsl:apply-templates select="node()|@*"/>
				<item guidRef="630efad4-7d85-a2be-4479-bd22f048508f"/>
				<item guidRef="a3347bda-4e93-0082-4544-319a5496c708"/>
		</xsl:copy>
	</xsl:template>

	<!-- ******************* Open Comp Source / Replace Comp ******************* -->
	<!-- Add new items to Pick/Distort/Translate/Rotate/Scale/Skew/Document/Desktop/Object/Comp menus -->
	<xsl:template match="//commandBarData[@guid='fd76519e-9440-45a1-8ab8-203b1056d572']/container/container[@modeID='3538970f-45f0-4fb4-aa65-e7ac487543e3' or
																																																					@modeID='5baba8c2-96b4-497f-a8ce-3ba9ed443e34' or
																																																					@modeID='a42b84fd-53ed-4c49-a558-12f830b8a9fc' or
																																																					@modeID='18a42679-4ac5-4f6a-9bde-4490d97a7dfc' or
																																																					@modeID='f3ad0e18-9d16-44a5-95de-a191480dd4af']">
		<xsl:apply-templates mode="insert-item" select=".">
			<xsl:with-param name="after">5c53c485-0c90-1f88-4c3b-cfb751a73b4d</xsl:with-param>
			<xsl:with-param name="content">
				<item guidRef="abc69efc-612b-4e78-bbb9-ae6765873262"/>
				<item guidRef="0da479a6-a0b1-40c2-8c65-cce761368152"/>
			</xsl:with-param>
		</xsl:apply-templates>
	</xsl:template>
	<xsl:template match="//commandBarData[@guid='cf5474ec-315c-4c77-8404-38947fcd60b3' or
																				@guid='c1958b8d-987d-4aa3-bf9d-a85a8f3b363a' or
																				@guid='550273c2-22e6-4cd4-8f13-ce9da8a3f169']/container">
		<xsl:apply-templates mode="insert-item" select=".">
			<xsl:with-param name="after">5c53c485-0c90-1f88-4c3b-cfb751a73b4d</xsl:with-param>
			<xsl:with-param name="content">
				<item guidRef="abc69efc-612b-4e78-bbb9-ae6765873262"/>
				<item guidRef="0da479a6-a0b1-40c2-8c65-cce761368152"/>
			</xsl:with-param>
		</xsl:apply-templates>
	</xsl:template>
	<!-- Customization Lsit -->
	<xsl:template match="//customizationList/container/container[@modeID='f9cbaa78-c7aa-42e1-9818-6487a1a7dbe5']">
		<xsl:copy>
			<xsl:apply-templates select="node()|@*"/>
				<item guidRef="abc69efc-612b-4e78-bbb9-ae6765873262"/>
				<item guidRef="0da479a6-a0b1-40c2-8c65-cce761368152"/>
		</xsl:copy>
	</xsl:template>

</xsl:stylesheet>