<?xml version="1.0"?>
<xsl:stylesheet version="1.0" 
								xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
								xmlns:frmwrk="Corel Framework Data"
								exclude-result-prefixes="frmwrk">
	<xsl:output method="xml" encoding="UTF-8" indent="yes"/>
	<frmwrk:uiconfig>
		<frmwrk:applicationInfo name="CorelDRAW" framework="CorelDRAW" userConfiguration="true" />
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
	<xsl:template match="//item[@guidRef='7109900f-4789-4451-9ba7-bb3df86db569']">
		<xsl:copy><xsl:apply-templates select="node()|@*"/><xsl:attribute name="guidRef">40e1a4d1-44b1-eaa2-459c-81df62947fec</xsl:attribute></xsl:copy>
	</xsl:template>
	<!-- Add new item to Dockers menu -->
	<xsl:template match="//commandBarData[@guid='3eaa9bbe-28fd-4672-9128-02974ee96332']/container">
		<xsl:apply-templates mode="insert-item" select=".">
			<xsl:with-param name="before">4d12d5a1-3ea5-49bf-bda4-988893320a8b</xsl:with-param>
			<xsl:with-param name="content"><item guidRef="40e1a4d1-44b1-eaa2-459c-81df62947fec"/></xsl:with-param>
		</xsl:apply-templates>
	</xsl:template>
	<!-- New Shortcut Key -->
	<xsl:template match="//shortcutKeyTables/table[@tableID='bc175625-191c-4b95-9053-756e5eee26fe']">
		<xsl:copy>
			<xsl:apply-templates select="node()|@*"/>
			<xsl:if test="not(.//key[@ctrl='true' and @shift='true' and text()='a'])">
				<keySequence itemRef="40e1a4d1-44b1-eaa2-459c-81df62947fec">
					<key ctrl="true" shift="true">a</key>
				</keySequence>
			</xsl:if>
		</xsl:copy>
	</xsl:template>

	<!-- ******************* Select WIA Source ******************* -->
	<!-- Add new item to Acquire Image menu -->
	<xsl:template match="//commandBarData[@guid='0f7513b8-ff74-4e00-ab81-5e503a2c8a31']/container">
		<xsl:apply-templates mode="insert-item" select=".">
			<xsl:with-param name="after">2e3cde6c-409a-46dc-a830-83ea6f42084b</xsl:with-param>
			<xsl:with-param name="content"><item guidRef="493dda8f-cb6b-41bc-83e9-7c8911c7f1db"/></xsl:with-param>
		</xsl:apply-templates>
	</xsl:template>
	<!-- Customization List -->
	<xsl:template match="//customizationList/container/container[@modeID='7aa80134-8e64-42d1-be0a-c7ec7f6c441f']">
		<xsl:copy><xsl:apply-templates select="node()|@*"/><item guidRef="493dda8f-cb6b-41bc-83e9-7c8911c7f1db"/></xsl:copy>
	</xsl:template>
	
	<!-- ******************* Page Sorter Zoom ******************* -->
	<xsl:template match="//container[@modeID='6c03e767-a719-4b3c-8e58-1bb3f19aa8c8']">
		<xsl:apply-templates mode="insert-item" select=".">
			<xsl:with-param name="after">bf372cd8-239f-48b9-8a53-e9f0b7a92205</xsl:with-param>
			<xsl:with-param name="content">
				<item guidRef="266435b4-6e53-460f-9fa7-f45be187d400"/>
				<item guidRef="a9622ae5-e590-44c0-b978-92437f6db148"/>
				<item guidRef="c0cbd79f-d500-4281-8cd4-c6c8dc6c8d47"/>
				<item guidRef="59aed862-f406-4421-9d5d-f5494b38cde9"/>
			</xsl:with-param>
		</xsl:apply-templates>
	</xsl:template>
	<!-- Customization List -->
	<xsl:template match="//customizationList/container/container[@modeID='4081cd53-2157-4227-bd4b-b9238f86ce51']">
		<xsl:copy>
			<xsl:apply-templates select="node()|@*"/>
				<item guidRef="a9622ae5-e590-44c0-b978-92437f6db148"/>
				<item guidRef="c0cbd79f-d500-4281-8cd4-c6c8dc6c8d47"/>
				<item guidRef="59aed862-f406-4421-9d5d-f5494b38cde9"/>
		</xsl:copy>
	</xsl:template>

	<!-- ******************* Sign In ******************* -->
	<!-- Add new menu items to end of Help Menu  -->
	<xsl:template match="//commandBarData[@guid='3a97999f-e1e6-4222-8168-873c504cdc02']/container">
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
	<xsl:template match="//customizationList/container/container[@modeID='71f8ffd6-46bd-43a3-8256-5412bc2d7741']">
		<xsl:copy>
			<xsl:apply-templates select="node()|@*"/>
				<item guidRef="630efad4-7d85-a2be-4479-bd22f048508f"/>
				<item guidRef="a3347bda-4e93-0082-4544-319a5496c708"/>
				<item guidRef="b0b0ef14-4158-278d-4679-412235e71438"/>
		</xsl:copy>
	</xsl:template>

	<!-- ******************* Open Comp Source / Replace Comp ******************* -->
	<!-- Add new items to bitmap or OLE object property bar -->
	<xsl:template match="//container[@modeID='188ce420-8cd7-4fc3-90cb-ef096938e83a']">
		<xsl:copy>
			<xsl:apply-templates select="node()|@*"/>
			<item guidRef="b5bdeadb-4749-45a9-853d-27c0c569859e"/>
			<item guidRef="c3780412-18dd-45a7-876b-e788d3f635f9"/>
		</xsl:copy>
	</xsl:template>
	<!-- Add new items to bitmap menu -->
	<xsl:template match="//commandBarData[@guid='4ddf79ec-25c9-4fcf-99a8-ff43845608dd']/container">
		<xsl:apply-templates mode="insert-item" select=".">
			<xsl:with-param name="after">b2f431a3-500e-4f5d-8fd5-c57a7b3d0c38</xsl:with-param>
			<xsl:with-param name="content">
				<item guidRef="b5bdeadb-4749-45a9-853d-27c0c569859e"/>
				<item guidRef="c3780412-18dd-45a7-876b-e788d3f635f9"/>
			</xsl:with-param>
		</xsl:apply-templates>
	</xsl:template>
	<!-- Add new items to context menus -->
	<xsl:template match="//commandBarData[@guid='812c5b74-7fa6-46d5-9407-345d211e346b' or
																				@guid='b3646177-602e-405c-9325-fa3606269fd0' or
																				@guid='1F5DE54C-93EE-4925-AC7F-0043FDF43B3D' or
																				@guid='6c78bc76-d88e-41d2-8785-646edc7a9b2e' or
																				@guid='c8ef99c3-5f2b-40ea-88f6-210bc0c52539' or
																				@guid='B78B5E10-1A2B-4881-90CE-07797AFDC6ED']/container">
		<xsl:apply-templates mode="insert-item" select=".">
			<xsl:with-param name="after">a3463722-e5f0-4776-80e6-15bef83f55b7</xsl:with-param>
			<xsl:with-param name="content">
				<item guidRef="b5bdeadb-4749-45a9-853d-27c0c569859e"/>
				<item guidRef="c3780412-18dd-45a7-876b-e788d3f635f9"/>
			</xsl:with-param>
		</xsl:apply-templates>
	</xsl:template>
	<!-- Customization Lsit -->
	<xsl:template match="//customizationList/container/container[@modeID='da7499f9-5b82-4bd7-8754-1f0244a61c93']">
		<xsl:copy>
			<xsl:apply-templates select="node()|@*"/>
				<item guidRef="b5bdeadb-4749-45a9-853d-27c0c569859e"/>
				<item guidRef="c3780412-18dd-45a7-876b-e788d3f635f9"/>
		</xsl:copy>
	</xsl:template>

</xsl:stylesheet>